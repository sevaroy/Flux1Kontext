interface ImageMessage {
  type: "image";
  image: string;
  imageBlob: Blob;
  from: "assistant";
  id: number;
  promptUsed?: string;
}

interface TextMessage {
  type: "text";
  text: string;
  from: "user" | "system" | "assistant";
  id: number;
}

interface LoadingMessage {
  type: "loading";
  from: "assistant";
  id: number;
}

type Message = ImageMessage | TextMessage | LoadingMessage;

export type { ImageMessage, TextMessage, LoadingMessage, Message }; 