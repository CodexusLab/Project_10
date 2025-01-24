
const Message = ({ sender, text }) => {
  const isUser = sender === "user";
  return (
    <div
      className={`flex ${isUser ? "justify-end" : "justify-start"} animate-slide-in`}
    >
      <div
        className={`max-w-[75%] px-4 py-3 rounded-lg shadow-md ${
          isUser
            ? "bg-blue-500 text-white rounded-tr-none"
            : "bg-gray-200 text-black rounded-tl-none"
        }`}
      >
        <p>{text}</p>
      </div>
    </div>
  );
};

export default Message;
