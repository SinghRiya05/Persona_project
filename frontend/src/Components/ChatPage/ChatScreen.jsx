import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const ChatScreen = () => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [typing, setTyping] = useState(false);
  const chatBoxRef = useRef(null);

  const API_URL = "https://persona-project-wg2r.onrender.com"; // backend URL (Render/Heroku)

  const handleReset = async () => {
    try {
      const res = await axios.post(`${API_URL}/api/reset-chat`);
      console.log(res.data);
      setChat([]); // reset local chat bhi
    } catch (error) {
      console.log(error);
    }
  };

  const handleSend = async () => {
    if (!message.trim()) return;

    const updatedChat = [...chat, { role: "user", content: message }];
    setChat(updatedChat);
    setMessage("");

    try {
      setTyping(true);
      const res = await axios.post(`${API_URL}/api/chat`, { message }); // ✅ string bhejna
      setTyping(false);

      setChat((prev) => [
        ...prev,
        { role: "assistant", content: res.data.reply }
      ]);
    } catch (error) {
      console.log(error);
      setTyping(false);
    }
  };

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [chat]);

  return (
    <div className="flex flex-col h-[90vh] bg-gray-100">
      {/* Messages Area */}
      <div ref={chatBoxRef} className="flex-1 p-4 overflow-y-auto">
        {chat.map((msg, i) => (
          <div
            key={i}
            className={`p-3 mb-3 rounded-xl text-white break-words 
              ${
                msg.role === "user"
                  ? "bg-amber-800 self-end ml-auto lg:max-w-[50%] max-w-[75%] rounded-tr-none"
                  : "bg-gray-700 self-start lg:max-w-[50%] max-w-[75%] rounded-tl-none"
              } 
              transition-all duration-200`}
          >
            {msg.content}
          </div>
        ))}
        {typing && (
          <div className="text-gray-500 italic mb-2">Typing...</div>
        )}
      </div>

      {/* Input Box */}
      <div className="p-3 bg-white flex items-center gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 p-2 border-none rounded-lg outline-none "
        />
        <button
          onClick={handleSend}
          className="px-4 py-2 bg-amber-800 text-white rounded-lg hover:bg-amber-700 duration-200"
        >
          Send
        </button>
        <button
          onClick={handleReset}
          className="px-4 ml-5 py-2 bg-amber-800 text-white rounded-lg hover:bg-amber-700 duration-200"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default ChatScreen;
