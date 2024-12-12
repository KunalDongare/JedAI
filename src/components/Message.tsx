import React, { useState } from "react";

import obiWan from "../assets/images/obiwan.jpeg";
import padwan from "../assets/images/Padwan.jpeg";
import { MessageType } from "../common/dtos/Message.dtos";
import ReactMarkdown from "react-markdown";

interface MessageProps extends MessageType {}

interface TextPart {
  type: "text" | "code";
  content: string;
}

const Message = ({ sender, text, reference }: MessageProps) => {
  const isUser = sender === "user";

  const [clickedIndex, setClickedIndex] = useState<number | null>(null);

  // Split text into parts based on code blocks
  const splitText = (text: string) => {
    const parts: TextPart[] = [];
    let currentIndex = 0;

    // Find all code blocks
    const codeBlockRegex = /```[\s\S]*?```/g;
    let match;

    while ((match = codeBlockRegex.exec(text)) !== null) {
      // Add text before code block if exists
      if (match.index > currentIndex) {
        parts.push({
          type: "text",
          content: text.slice(currentIndex, match.index),
        });
      }
      // Add code block and clean it
      const codeContent = match[0]
        .replace(/^```[\w]*\n/, "") // Remove opening ```language
        .replace(/```$/, ""); // Remove closing ```

      parts.push({
        type: "code",
        content: codeContent,
      });
      currentIndex = match.index + match[0].length;
    }

    // Add remaining text if exists
    if (currentIndex < text.length) {
      parts.push({
        type: "text",
        content: text.slice(currentIndex),
      });
    }

    return parts;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleCopyClick = (text: string, index: number) => {
    copyToClipboard(text);
    setClickedIndex(index);
    setTimeout(() => setClickedIndex(null), 1000); // Hide tick after 3 seconds
  };

  return (
    <div
      className={`flex ${isUser ? "justify-end" : "justify-start"} space-x-3`}
    >
      {!isUser && (
        <img
          src={obiWan}
          alt="obi-wan"
          className="w-10 h-10 rounded-full border-2 border-red-600 mt-1 object-cover"
        />
      )}
      <div
        className={`rounded-lg flex gap-5 p-4 text-gray-100 ${
          !isUser ? "bg-[#444654]" : "backdrop-blur-sm"
        }`}
      >
        <div
          className={`whitespace-pre-wrap break-words max-w-lg px-3 ${
            isUser ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`${
              isUser ? "text-right" : "text-left"
            } prose prose-invert`}
          >
            {text &&
              splitText(text).map((part, index) =>
                part.type === "code" ? (
                  <div
                    key={index}
                    className="relative whitespace-pre-wrap bg-gray-900 p-3 mb-5 mt-2 rounded-lg border border-gray-500"
                  >
                    <button
                      onClick={() => handleCopyClick(part.content, index)}
                      className="absolute top-2 right-2 text-gray-400 hover:text-gray-200 bg-gray-800 rounded p-1"
                      title="Copy to clipboard"
                    >
                      {clickedIndex === index ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-green-500"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1.707-6.707a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-1.5-1.5a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                          <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                        </svg>
                      )}
                    </button>
                    {part.content}
                  </div>
                ) : (
                  <ReactMarkdown key={index}>{part.content}</ReactMarkdown>
                )
              )}
          </div>
          <div className="whitespace-pre-wrap">{reference}</div>
        </div>
      </div>
      {isUser && (
        <img
          src={padwan}
          alt="padwan"
          className="w-10 h-10 rounded-full border-2 border-sky-500 mt-2"
        />
      )}
    </div>
  );
};

export default Message;
