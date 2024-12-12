import React, { useState } from "react";

interface ChatInputProps {
  onSendMessage: (query: string) => void;
}
const ChatInput = ({ onSendMessage }: ChatInputProps) => {
  const [query, setQuery] = useState("");

  const handleSend = () => {
    if (query.trim() === "") return;
    onSendMessage(query);
    setQuery("");
  };

  return (
    <div className="border-t border-gray-600 p-2 bg-[#50516028] rounded-b-lg backdrop-blur-sm">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center bg-[#40414F] rounded-lg border border-gray-600 ">
          <textarea
            className="flex-grow p-3  bg-transparent text-white focus:outline-none resize-none"
            placeholder="Ask Obi-Wan"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
          />
          <button
            onClick={handleSend}
            className="p-3 py-5 hover:bg-gray-600 rounded-r-lg text-gray-400 hover:text-cyan-400` transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
