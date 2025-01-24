import React, { useState, useEffect } from "react";
import ChatHeader from "./ChatHeader";
import Message from "./Message";
import ChatFooter from "./ChatFooter";

const ChatApp = () => {
  const [messages, setMessages] = useState([
    { id: 1, sender: "bot", text: "Hello! I'm your assistant. How can I help you?" },
    { id: 2, sender: "user", text: "Make a css design for me" },
    { id: 3, sender: "bot", text: "Hello! I'm your assistant. How can I help you?" },
    { id: 4, sender: "user", text: "Make a css design for me" },
    { id: 5, sender: "bot", text: "Hello! I'm your assistant. How can I help you?" },
    { id: 6, sender: "user", text: "Make a css design for me" },
    { id: 7, sender: "bot", text: "Hello! I'm your assistant. How can I help you?" },
    { id: 8 , sender: "user", text: "Make a css design for me" },
  ]);
  const [botTyping, setBotTyping] = useState(false);

  const addMessage = (text) => {
    setMessages([...messages, { id: messages.length + 1, sender: "user", text }]);

    setBotTyping(true);
    setTimeout(() => {
      setBotTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          sender: "bot",
          text: "Got it! Let me process your query.",
        },
      ]);
    }, 1500);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-700">
      <div className="w-full max-w-md bg-white/90 shadow-2xl rounded-lg flex flex-col h-[600px] overflow-hidden backdrop-blur-md">
        <ChatHeader />
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <Message key={msg.id} sender={msg.sender} text={msg.text} />
          ))}
          {botTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg animate-pulse">
                Typing...
              </div>
            </div>
          )}
        </div>
        <ChatFooter onSend={addMessage} />
      </div>
    </div>
  );
};

export default ChatApp;
