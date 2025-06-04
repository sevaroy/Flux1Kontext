import React from "react";
import { ImageMessage } from "./types";

interface MainImageDisplayProps {
  loading: boolean;
  selectedImage: ImageMessage | null;
  handleImageClick: (imageUrl: string) => void;
  scrollToBottom: () => void;
}

const MainImageDisplay: React.FC<MainImageDisplayProps> = ({
  loading,
  selectedImage,
  handleImageClick,
  scrollToBottom,
}) => {
  return (
    <div className="flex-1 flex items-center justify-center p-6 md:p-8 relative">
      {loading ? (
        <div className="flex flex-col items-center gap-4 py-8 px-12">
          <div className="w-16 h-16 border-4 border-gray-300 border-t-orange-500 rounded-full animate-spin"></div>
          <span className="text-gray-600">Generating image...</span>
        </div>
      ) : (
        selectedImage && (
          <img
            src={selectedImage.image}
            alt="Selected image"
            className="max-w-full max-h-full object-contain rounded-lg shadow-lg cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => handleImageClick(selectedImage.image)}
            onLoad={scrollToBottom}
          />
        )
      )}
    </div>
  );
};

export default MainImageDisplay;
