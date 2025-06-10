"use client";

import React, { useState, useEffect } from "react";
import UploadSection from "./UploadSection";
import ChatSection from "./ChatSection";
import { ImageMessage } from "./types";
import { useImageUpload } from "./hooks/useImageUpload";
import { useChatCore } from "./hooks/useChatCore";
import { useImageActions } from "./hooks/useImageActions";
import { useDesktopDetection } from "./hooks/useDesktopDetection";
import { useBodyScrollLock } from "./hooks/useBodyScrollLock";

const starterImages = [
  {
    imageUrl:
      "https://replicate.delivery/pbxt/N55l5TWGh8mSlNzW8usReoaNhGbFwvLeZR3TX1NL4pd2Wtfv/replicate-prediction-f2d25rg6gnrma0cq257vdw2n4c.png",
    suggestedPrompt: "make it into a 90s cartoon",
  },
  {
    imageUrl:
      "https://replicate.delivery/pbxt/N5cepICxyaagdvULl0phi7ImdxuFz05TR2l623zqxhNR9q5Y/van-gogh.jpeg",
    suggestedPrompt: "Using this style, a panda astronaut riding a unicorn",
  },
  {
    imageUrl:
      "https://replicate.delivery/xezq/OKWfR6jlQwzekkSsfQOppX55O3vaNv6xZ4qY6RfHjwQHOwDTB/tmp9p3v3brc.png",
    suggestedPrompt: "remove the text from the sweatshirt",
  },
  {
    imageUrl:
      "https://replicate.delivery/pbxt/N5trWTJCJQbJVWz5nhLEscS1w16r1hGl5zuWceJhVSnWZfGu/mona-lisa-1024.jpg",
    suggestedPrompt: "close her eyes",
  },
  {
    imageUrl:
      "https://replicate.delivery/mgxm/b033ff07-1d2e-4768-a137-6c16b5ed4bed/d_1.png",
    suggestedPrompt:
      "Convert to a high-quality restoration, enhancing details and removing any damage or degradation",
  },
];

function App() {
  const [showUpload, setShowUpload] = useState(true);
  const [, setStarterUsed] = useState(false);
  const [hoveredImageId, setHoveredImageId] = useState<number | null>(null);

  const isDesktop = useDesktopDetection();
  useBodyScrollLock(isDesktop);

  const {
    setMessages,
    input,
    setInput,
    loading,
    setLoading,
    imageVersions,
    setImageVersions,
    selectedImage,
    setSelectedImage,
    handleSend,
    cancelGeneration,
  } = useChatCore();

  const {
    fileInputRef,
    handleFileSelect,
    handleStarterImageClick,
    handleDrag,
    handleDrop,
    dragActive,
  } = useImageUpload({
    setMessages,
    setImageVersions,
    setSelectedImage,
    setShowUpload,
    setInput,
    setStarterUsed,
    setLoading,
  });

  const { handleImageClick, handleDownloadImage } = useImageActions();

  // Helper to scroll to bottom (for image onLoad)
  function scrollToBottom() {
    // This function can remain as it's called on image load to ensure visibility.
    // However, it does not rely on chatContainerRef for current UI.
    // No direct scrolling logic needed for image container as it's centered
  }

  // Attach drag events when in upload mode
  useEffect(() => {
    if (showUpload) {
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
    }
  }, [showUpload, handleDrag, handleDrop]);

  // Handle click on an image in the left history panel
  const handleLeftImageClick = (image: ImageMessage) => {
    setSelectedImage(image);
  };

  return (
    <div className="from-[#e04f0c] to-[#f47020] md:overflow-auto overflow-hidden flex flex-col">
      {/* Main Content */}
      <div className="flex flex-1 md:flex md:items-center">
        {showUpload ? (
          <UploadSection
            dragActive={dragActive}
            handleDrag={handleDrag}
            handleDrop={handleDrop}
            fileInputRef={fileInputRef}
            handleFileSelect={handleFileSelect}
            starterImages={starterImages}
            handleStarterImageClick={handleStarterImageClick}
            loading={loading}
          />
        ) : (
          <ChatSection
            imageVersions={imageVersions}
            selectedImage={selectedImage}
            handleLeftImageClick={handleLeftImageClick}
            hoveredImageId={hoveredImageId}
            setHoveredImageId={setHoveredImageId}
            handleDownloadImage={handleDownloadImage}
            loading={loading}
            handleImageClick={handleImageClick}
            scrollToBottom={scrollToBottom}
            input={input}
            setInput={setInput}
            handleSend={handleSend}
            cancelGeneration={cancelGeneration}
            setMessages={setMessages}
            setImageVersions={setImageVersions}
            setSelectedImage={setSelectedImage}
            setShowUpload={setShowUpload}
            setStarterUsed={setStarterUsed}
            setLoading={setLoading}
          />
        )}
      </div>
    </div>
  );
}

export default App;
