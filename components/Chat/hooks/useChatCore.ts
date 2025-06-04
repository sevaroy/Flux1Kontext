import { useState } from "react";
import { ImageMessage, TextMessage, LoadingMessage, Message } from "../types";
import { blobToDataUrl } from "../utils";

export const useChatCore = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [predictionId, setPredictionId] = useState<string | null>(null);
  const [abortController, setAbortController] =
    useState<AbortController | null>(null);
  const [imageVersions, setImageVersions] = useState<ImageMessage[]>([]);
  const [selectedImage, setSelectedImage] = useState<ImageMessage | null>(null);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    const currentSelectedImage = selectedImage;
    if (!input.trim() || loading || !currentSelectedImage) return;

    const userMsg: TextMessage = {
      type: "text",
      text: input,
      from: "user",
      id: Date.now(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    const loadingMsg: LoadingMessage = {
      type: "loading",
      from: "assistant",
      id: Date.now() + 1,
    };
    setMessages((prev) => [...prev, loadingMsg]);

    try {
      const controller = new AbortController();
      setAbortController(controller);

      let inputImageValue: string;

      if (currentSelectedImage.image.startsWith("blob:")) {
        console.log("Converting blob to data URL for input_image...");
        inputImageValue = await blobToDataUrl(currentSelectedImage.imageBlob);
        console.log("Image data URL length:", inputImageValue.length);
      } else {
        console.log(
          "Using direct image URL for input_image:",
          currentSelectedImage.image
        );
        inputImageValue = currentSelectedImage.image;
      }

      console.log("Sending request to /generate-image...");
      const requestBody = {
        prompt: input,
        input_image: inputImageValue,
      };
      console.log("Request body size:", JSON.stringify(requestBody).length);

      const res = await fetch("/api/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
        signal: controller.signal,
      });

      console.log("Response status:", res.status);
      console.log(
        "Response headers:",
        Object.fromEntries(res.headers.entries())
      );

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Error response body:", errorText);
        throw new Error(`HTTP ${res.status}: ${errorText}`);
      }

      const result = await res.json();
      console.log("Response result:", result);

      if (result.error) {
        throw new Error(result.error);
      }

      const imageUrl = result.imageUrl;
      console.log("Cloudflare Images URL:", imageUrl);

      const imageResponse = await fetch(imageUrl);
      const imageBlob = await imageResponse.blob();
      console.log("Image blob size:", imageBlob.size);

      const generatedImageId = Date.now();
      const generatedImageMsg: ImageMessage = {
        type: "image",
        image: imageUrl,
        imageBlob: imageBlob,
        from: "assistant",
        id: generatedImageId,
        promptUsed: input,
      };

      setMessages((prev) => {
        const updatedMessages: Message[] = [];
        let loadingRemoved = false;
        for (const msg of prev) {
          if (msg.type === "loading" && !loadingRemoved) {
            loadingRemoved = true;
          } else if (msg.id === userMsg.id) {
            updatedMessages.push({ ...msg });
          } else {
            updatedMessages.push(msg);
          }
        }
        updatedMessages.push(generatedImageMsg);
        return updatedMessages;
      });

      setImageVersions((prev) => [...prev, generatedImageMsg]);
      setSelectedImage(generatedImageMsg);
    } catch (err: any) {
      if (err.name !== "AbortError") {
        setMessages((prev) => prev.filter((msg) => msg.type !== "loading"));
        setMessages((prev) => [
          ...prev,
          {
            type: "text",
            text:
              "Sorry, there was an error generating the image: " + err.message,
            from: "assistant",
            id: Date.now(),
          },
        ]);
      } else {
        console.log("Request was cancelled");
        setMessages((prev) => prev.filter((msg) => msg.type !== "loading"));
      }
    } finally {
      setLoading(false);
      setPredictionId(null);
      setAbortController(null);
    }
  };

  const cancelGeneration = () => {
    console.log("Cancel generation called");

    if (abortController) {
      console.log("Aborting request...");
      abortController.abort();
      setAbortController(null);
    }

    setLoading(false);
    setPredictionId(null);

    const currentMessages = [...messages];
    const lastUserMessage = currentMessages
      .slice()
      .reverse()
      .find(
        (msg): msg is TextMessage => msg.from === "user" && msg.type === "text"
      );
    console.log("Last user message:", lastUserMessage);

    setMessages((prev) => {
      const filtered = prev.filter(
        (msg) =>
          msg.type !== "loading" &&
          !(
            lastUserMessage &&
            msg.from === "user" &&
            msg.type === "text" &&
            msg.id === lastUserMessage.id
          )
      );
      console.log("Messages after cancel:", filtered.length);
      return filtered;
    });

    if (lastUserMessage) {
      setTimeout(() => {
        console.log("Restoring text to input:", lastUserMessage.text);
        setInput(lastUserMessage.text);
      }, 50);
    }
  };

  const resetAll = () => {
    if (abortController) {
      abortController.abort();
    }
    setMessages([]);
    setInput("");
    setPredictionId(null);
    setAbortController(null);
    setLoading(false);
    setImageVersions([]);
    setSelectedImage(null);
  };

  return {
    messages,
    setMessages,
    input,
    setInput,
    loading,
    setLoading,
    predictionId,
    setPredictionId,
    abortController,
    setAbortController,
    imageVersions,
    setImageVersions,
    selectedImage,
    setSelectedImage,
    handleSend,
    cancelGeneration,
    resetAll,
  };
}; 