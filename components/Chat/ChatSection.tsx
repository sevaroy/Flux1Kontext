import React from "react";
import ImageHistoryPanel from "./ImageHistoryPanel";
import MainImageDisplay from "./MainImageDisplay";
import ChatInputArea from "./ChatInputArea";
import { ImageMessage, Message } from "./types";

interface ChatSectionProps {
  imageVersions: ImageMessage[];
  selectedImage: ImageMessage | null;
  handleLeftImageClick: (image: ImageMessage) => void;
  hoveredImageId: number | null;
  setHoveredImageId: React.Dispatch<React.SetStateAction<number | null>>;
  handleDownloadImage: (image: ImageMessage) => void;
  handleCopyImage: (image: ImageMessage) => Promise<void>;
  loading: boolean;
  handleImageClick: (imageUrl: string) => void;
  scrollToBottom: () => void;
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  handleSend: (e: React.FormEvent) => Promise<void>;
  cancelGeneration: () => void;
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  setImageVersions: React.Dispatch<React.SetStateAction<ImageMessage[]>>;
  setSelectedImage: React.Dispatch<React.SetStateAction<ImageMessage | null>>;
  setShowUpload: React.Dispatch<React.SetStateAction<boolean>>;
  setStarterUsed: React.Dispatch<React.SetStateAction<boolean>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChatSection: React.FC<ChatSectionProps> = ({
  imageVersions,
  selectedImage,
  handleLeftImageClick,
  hoveredImageId,
  setHoveredImageId,
  handleDownloadImage,
  handleCopyImage,
  loading,
  handleImageClick,
  scrollToBottom,
  input,
  setInput,
  handleSend,
  cancelGeneration,
  setMessages,
  setImageVersions,
  setSelectedImage,
  setShowUpload,
  setStarterUsed,
  setLoading,
}) => {
  return (
    <div className="w-full h-full flex md:max-w-7xl mx-auto md:p-6 p-4">
      {/* Left Panel - Image History */}
      <ImageHistoryPanel
        imageVersions={imageVersions}
        selectedImage={selectedImage}
        handleLeftImageClick={handleLeftImageClick}
        hoveredImageId={hoveredImageId}
        setHoveredImageId={setHoveredImageId}
        handleDownloadImage={handleDownloadImage}
        handleCopyImage={handleCopyImage}
        setMessages={setMessages}
        setImageVersions={setImageVersions}
        setSelectedImage={setSelectedImage}
        setShowUpload={setShowUpload}
        setInput={setInput}
        setStarterUsed={setStarterUsed}
        setLoading={setLoading}
      />

      {/* Right Panel - Main Image Display and Input */}
      <div className="flex-1 flex flex-col bg-white rounded-lg shadow-md overflow-hidden">
        {/* Top Part - Selected Image Display */}
        <MainImageDisplay
          loading={loading}
          selectedImage={selectedImage}
          handleImageClick={handleImageClick}
          scrollToBottom={scrollToBottom}
        />

        {/* Input Area */}
        <ChatInputArea
          input={input}
          setInput={setInput}
          handleSend={handleSend}
          loading={loading}
          cancelGeneration={cancelGeneration}
        />
      </div>
    </div>
  );
};

export default ChatSection;
