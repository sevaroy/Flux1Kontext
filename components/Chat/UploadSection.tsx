import React, { useRef } from "react";

interface UploadSectionProps {
  dragActive: boolean;
  handleDrag: (e: DragEvent) => void;
  handleDrop: (e: DragEvent) => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  handleFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  starterImages: { imageUrl: string; suggestedPrompt: string }[];
  handleStarterImageClick: (starter: {
    imageUrl: string;
    suggestedPrompt: string;
  }) => void;
  loading: boolean;
}

const UploadSection: React.FC<UploadSectionProps> = ({
  dragActive,
  handleDrag,
  handleDrop,
  fileInputRef,
  handleFileSelect,
  starterImages,
  handleStarterImageClick,
  loading,
}) => {
  return (
    <div className="w-full md:max-w-4xl bg-white md:shadow-md flex flex-col overflow-hidden md:overflow-visible">
      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-2xl p-6 md:p-12 text-center cursor-pointer mb-12 ${
          dragActive
            ? "border-green-400 bg-green-50 text-green-700"
            : "border-gray-300 bg-gray-50 hover:border-orange-400 hover:bg-orange-50 text-gray-700 hover:text-orange-700"
        }`}
        onClick={() => fileInputRef.current?.click()}
      >
        <div className="upload-content">
          <svg
            className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-3 md:mb-4 opacity-70"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            ></path>
          </svg>
          <h3 className="text-lg md:text-xl mb-1 md:mb-2 font-semibold">
            Upload an image to get started
          </h3>
          <p className="text-base md:text-lg opacity-80">
            Drag and drop an image here, or click to browse
          </p>
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            className="hidden"
            onChange={handleFileSelect}
          />
        </div>
      </div>

      {/* Starter Images Section */}
      <div className="text-center text-gray-600 text-base mb-4 font-medium">
        Or choose a starting image:
      </div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {starterImages.map((starter, idx) => (
          <button
            key={idx}
            className="aspect-square w-full rounded-xl overflow-hidden border-2 border-gray-200 hover:border-orange-400 focus:border-orange-500 transition-all shadow-sm bg-gray-50 group"
            onClick={() => handleStarterImageClick(starter)}
            disabled={loading}
            title={starter.suggestedPrompt}
          >
            <img
              src={starter.imageUrl}
              alt={starter.suggestedPrompt}
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-200"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default UploadSection;
