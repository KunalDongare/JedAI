import React, { useState, useRef, useEffect } from "react";

import Message from "./Message.tsx";
import ChatInput from "./ChatInput.tsx";
import { MessageType } from "../common/dtos/Message.dtos";
import { ASK_CODE_EP } from "../common/endpoints/Endpoints.ts";
import api from "../api/Instance.ts";
import darthMaul from "../assets/images/darth_maul.gif";
import blueLightSaber from "../assets/images/bluelightsaber.png";
import stormTrooper from "../assets/images/storm_trooper.gif";

const ChatInterface = () => {
  const [messages, setMessages] = useState([] as MessageType[]);
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (query: string) => {
    const userMessage: MessageType = {
      sender: "user",
      text: query,
      reference: "",
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await api.post(ASK_CODE_EP, {
        message: query,
      });
      const botMessage: MessageType = {
        sender: "bot",
        text: response.data.responseCodeExplainer.textResponse,
        reference: response.data.responseQueryDetector.textResponse,
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: MessageType = {
        sender: "bot",
        text: "Something went wrong. Try again!",
        reference: "",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#dbdbfc18] backdrop-blur-sm w-full max-w-4xl h-[97%] shadow-lg rounded-lg flex flex-col">
      <div className="flex-grow p-6 overflow-y-auto space-y-4 ">
        <div className="flex items-center justify-center">
          <img
            src={darthMaul}
            alt="storm_trooper"
            className="w-10 h-10 object-center mr-2"
          />

          <h1 className="text-2xl font-bold text-center text-white">
            Padwan, ready to explore the repository far, far away?
          </h1>
          <img
            src={blueLightSaber}
            alt="lightsaber"
            className="w-10 h-10 object-center ml-1"
          />
        </div>

        {messages.map((msg) => (
          <Message
            sender={msg.sender}
            text={msg.text}
            reference={msg.reference}
          />
        ))}
        {isLoading && (
          <div className="flex items-center">
            <img
              src={stormTrooper}
              alt="storm_trooper"
              className="w-10 h-10 object-center mr-2"
            />
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              <div className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatInterface;
