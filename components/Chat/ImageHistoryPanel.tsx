import React from "react";
import { ImageMessage, Message } from "./types";
import { useImageUpload } from "./hooks/useImageUpload";

interface ImageHistoryPanelProps {
  imageVersions: ImageMessage[];
  selectedImage: ImageMessage | null;
  handleLeftImageClick: (image: ImageMessage) => void;
  hoveredImageId: number | null;
  setHoveredImageId: React.Dispatch<React.SetStateAction<number | null>>;
  handleDownloadImage: (image: ImageMessage) => void;
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  setImageVersions: React.Dispatch<React.SetStateAction<ImageMessage[]>>;
  setSelectedImage: React.Dispatch<React.SetStateAction<ImageMessage | null>>;
  setShowUpload: React.Dispatch<React.SetStateAction<boolean>>;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  setStarterUsed: React.Dispatch<React.SetStateAction<boolean>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const ImageHistoryPanel: React.FC<ImageHistoryPanelProps> = ({
  imageVersions,
  selectedImage,
  handleLeftImageClick,
  hoveredImageId,
  setHoveredImageId,
  handleDownloadImage,
  setMessages,
  setImageVersions,
  setSelectedImage,
  setShowUpload,
  setInput,
  setStarterUsed,
  setLoading,
}) => {
  const { fileInputRef, handleFileSelect } = useImageUpload({
    setMessages,
    setImageVersions,
    setSelectedImage,
    setShowUpload,
    setInput,
    setStarterUsed,
    setLoading,
  });

  return (
    <div className="hidden md:flex flex-col w-1/4 max-w-xs space-y-3 pr-2">
      <button
        onClick={() => fileInputRef.current?.click()}
        className="flex items-center justify-center gap-2 p-2 mb-3 rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition-colors duration-200 shadow-md"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
          ></path>
        </svg>
        <span>Upload</span>
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          className="hidden"
          onChange={handleFileSelect}
        />
      </button>
      <div className="flex flex-col gap-2 overflow-y-auto scrollbar-hide h-[calc(100vh-82px)]">
        {imageVersions
          .slice()
          .reverse()
          .map((img, index, arr) => (
            <button
              key={img.id}
              className={`shrink-0 relative flex items-center gap-2 p-2 rounded-lg transition-colors group ${
                selectedImage?.id === img.id
                  ? "bg-orange-100 border-orange-400"
                  : "hover:bg-gray-50 border-transparent"
              } border-2 overflow-hidden`}
              onClick={() => handleLeftImageClick(img)}
              onMouseEnter={() => setHoveredImageId(img.id)}
              onMouseLeave={() => setHoveredImageId(null)}
            >
              <img
                src={img.image}
                alt={`Version v${arr.length - 1 - index}`}
                className="w-16 h-16 object-cover rounded-md flex-shrink-0"
              />
              <div className="flex-1 flex flex-col justify-center min-w-0">
                {hoveredImageId === img.id ? (
                  <div className="flex gap-2 justify-end items-center pr-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDownloadImage(img);
                      }}
                      className="w-8 h-8 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full flex items-center justify-center transition-colors duration-200"
                      title="Download image"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                        ></path>
                      </svg>
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-end pr-2">
                    <span className="font-medium text-gray-700 whitespace-nowrap overflow-hidden text-ellipsis">
                      v{arr.length - 1 - index}
                    </span>
                  </div>
                )}
              </div>
            </button>
          ))}
      </div>
    </div>
  );
};

export default ImageHistoryPanel;
