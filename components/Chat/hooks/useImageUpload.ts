import { useState, useRef, useEffect } from "react";
import { ImageMessage, Message } from "../types";
import { scaleImageTo1Megapixel } from "../utils";

interface UseImageUploadProps {
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  setImageVersions: React.Dispatch<React.SetStateAction<ImageMessage[]>>;
  setSelectedImage: React.Dispatch<React.SetStateAction<ImageMessage | null>>;
  setShowUpload: React.Dispatch<React.SetStateAction<boolean>>;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  setStarterUsed: React.Dispatch<React.SetStateAction<boolean>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useImageUpload = ({
  setMessages,
  setImageVersions,
  setSelectedImage,
  setShowUpload,
  setInput,
  setStarterUsed,
  setLoading,
}: UseImageUploadProps) => {
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Process uploaded file
  const handleFile = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file.");
      return;
    }

    // Validate file size (10MB limit)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      alert("Image file is too large. Please select an image under 10MB.");
      return;
    }

    try {
      const scaledBlob = await scaleImageTo1Megapixel(file);
      const url = URL.createObjectURL(scaledBlob);

      const newImageMsg: ImageMessage = {
        type: "image",
        image: url,
        imageBlob: scaledBlob,
        from: "assistant",
        id: Date.now(),
        promptUsed: "Initial image uploaded",
      };

      setMessages((prevMessages) => [
        ...prevMessages,
        newImageMsg,
        {
          type: "text",
          text: "Image uploaded! How would you like to edit it?",
          from: "system",
          id: Date.now() + 1,
        },
      ]);

      setImageVersions((prevImageVersions) => [
        ...prevImageVersions,
        newImageMsg,
      ]);
      setSelectedImage(newImageMsg);

      setShowUpload(false);
    } catch (error: any) {
      alert("Failed to process image: " + error.message);
    }
  };

  // Handle file selection
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  // Handle click on starter image
  const handleStarterImageClick = async (starter: {
    imageUrl: string;
    suggestedPrompt: string;
  }) => {
    try {
      setLoading(true);
      const res = await fetch(starter.imageUrl);
      const blob = await res.blob();

      const newImageMsg: ImageMessage = {
        type: "image",
        image: starter.imageUrl,
        imageBlob: blob,
        from: "assistant",
        id: Date.now(),
        promptUsed: starter.suggestedPrompt || undefined,
      };

      setMessages((prevMessages) => [
        ...prevMessages,
        newImageMsg,
        {
          type: "text",
          text: "Image loaded! Tell me how you'd like to edit it.",
          from: "system",
          id: Date.now() + 1,
        },
      ]);

      setImageVersions((prevImageVersions) => [
        ...prevImageVersions,
        newImageMsg,
      ]);
      setSelectedImage(newImageMsg);

      setShowUpload(false);
      setInput(starter.suggestedPrompt || "");
      setStarterUsed(true);
    } catch (err) {
      alert("Failed to load starter image.");
    } finally {
      setLoading(false);
    }
  };

  // Drag and drop handlers for upload area
  const handleDrag = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const files = e.dataTransfer?.files;
    if (files && files[0] && files[0].type.startsWith("image/")) {
      handleFile(files[0]);
    }
  };

  // Attach drag events when in upload mode
  useEffect(() => {
    // Use window as the target for drag events, and cast event type to DragEvent
    window.addEventListener("dragenter", handleDrag);
    window.addEventListener("dragover", handleDrag);
    window.addEventListener("dragleave", handleDrag);
    window.addEventListener("drop", handleDrop);
    return () => {
      window.removeEventListener("dragenter", handleDrag);
      window.removeEventListener("dragover", handleDrag);
      window.removeEventListener("dragleave", handleDrag);
      window.removeEventListener("drop", handleDrop);
    };
  }, []); // Empty dependency array as showUpload will be managed by parent

  const resetFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return {
    dragActive,
    fileInputRef,
    handleFileSelect,
    handleStarterImageClick,
    handleDrag,
    handleDrop,
    resetFileInput,
  };
}; 