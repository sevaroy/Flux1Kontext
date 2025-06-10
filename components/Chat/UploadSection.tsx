import React, { useRef } from "react";

interface UploadSectionProps {
  dragActive: boolean;
  handleDrag: (e: React.DragEvent<HTMLLabelElement>) => void;
  handleDrop: (e: React.DragEvent<HTMLLabelElement>) => void;
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
    <div className="flex flex-col items-center justify-center gap-6 p-4 md:p-6 max-w-4xl mx-auto">
      {/* 強調主要動作的引導文字 */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">上傳圖片以開始創作</h2>
        <p className="text-gray-500">上傳一張圖片，我們將使用 AI 技術為您生成獨特的視覺內容</p>
      </div>

      {/* 上傳按鈕區域 - 加強視覺焦點 */}
      <div className="relative w-full max-w-md">
        <input
          type="file"
          id="image-upload"
          accept="image/*"
          className="hidden"
          onChange={handleFileSelect}
          disabled={loading}
        />
        <label
          htmlFor="image-upload"
          role="button"
          aria-label="上傳或拖放圖片"
          aria-disabled={loading}
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          className={`
            flex flex-col items-center justify-center h-32 md:h-40 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-300 shadow-md
            ${dragActive ? 'border-green-500 bg-green-50' : 'border-blue-500 bg-blue-50 hover:border-blue-700 hover:bg-blue-100 hover:shadow-lg'}
            ${loading ? 'opacity-50 pointer-events-none' : ''}
          `}
        >
          {loading ? (
            <svg
              className="animate-spin w-8 h-8 text-blue-500 mb-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              />
            </svg>
          ) : (
            <svg
              className="w-8 h-8 text-blue-500 mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
          )}
          <span className="text-base font-medium text-blue-700">
            {loading ? '上傳中…' : '點擊或拖放以上傳'}
          </span>
          {!loading && (
            <span className="text-sm text-gray-500 mt-1">
              支援 JPG, PNG, GIF 等格式
            </span>
          )}
        </label>
      </div>

      {/* 起手範例圖片 - 作為次要選項 */}
      <div className="text-center w-full max-w-md">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">或從這些範例開始</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
          {starterImages.map((starter, index) => (
            <button
              key={index}
              className="relative h-24 rounded-lg overflow-hidden border-2 border-gray-200 hover:border-blue-400 transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              onClick={() => handleStarterImageClick(starter)}
              disabled={loading}
              title={starter.suggestedPrompt}
              aria-label={starter.suggestedPrompt}
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
    </div>
  );
};

export default UploadSection;
