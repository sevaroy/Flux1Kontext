import React from "react";

interface ChatInputAreaProps {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  handleSend: (e: React.FormEvent) => Promise<void>;
  loading: boolean;
  cancelGeneration: () => void;
}

const ChatInputArea: React.FC<ChatInputAreaProps> = ({
  input,
  setInput,
  handleSend,
  loading,
  cancelGeneration,
}) => {
  return (
    <div
      className="flex-shrink-0 bg-white p-4"
      style={{
        paddingBottom: "calc(1rem + env(safe-area-inset-bottom))",
      }}
    >
      <form
        onSubmit={handleSend}
        className="flex items-end gap-3 max-w-4xl mx-auto h-full"
      >
        <div className="flex-1 relative h-full">
          <div className="bg-gray-100 rounded-xl px-4 py-3 pr-12 border-2 border-transparent focus-within:border-orange-500 transition-colors h-full flex items-center">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Tell us the changes you want..."
              className="w-full bg-transparent border-none outline-none resize-y text-base h-full"
              rows={1}
              style={{ minHeight: "24px", maxHeight: "120px" }}
              disabled={loading}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  if (!loading && input.trim()) {
                    handleSend(e);
                  }
                }
              }}
            />

            {/* Send/Cancel Button */}
            {loading ? (
              <button
                type="button"
                onClick={cancelGeneration}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-all duration-200"
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
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            ) : (
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 text-white rounded-full flex items-center justify-center transition-all duration-200 disabled:cursor-not-allowed"
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
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  ></path>
                </svg>
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChatInputArea;
