import React from "react";

const ChatHeader = () => {
  return (
    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 flex items-center space-x-3 shadow-md">
      <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
        🤖
      </div>
      <h2 className="text-lg font-semibold">Codexuslab Bot Assistant</h2>
    </div>
  );
};

export default ChatHeader;
