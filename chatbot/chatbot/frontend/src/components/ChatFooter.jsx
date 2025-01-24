import  { useState } from "react";

const ChatFooter = ({ onSend }) => {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      onSend(input);
      setInput("");
    }
  };

  return (
    <div className="flex items-center border-t p-4 bg-white/80 backdrop-blur-lg shadow-md">
      <input
        type="text"
        className="flex-1 p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-500"
        placeholder="Type your message..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        className="ml-3 px-4 py-2 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition-all"
        onClick={handleSend}
      >
        ➤
      </button>
    </div>
  );
};

export default ChatFooter;
