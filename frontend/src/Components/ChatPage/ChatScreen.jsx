import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm';
import { ArrowUp, Delete } from "lucide-react";

const ChatScreen = () => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState(() => {
    // ✅ Refresh hone par localStorage se load karo
    const savedChat = localStorage.getItem("chatHistory");
    return savedChat ? JSON.parse(savedChat) : [];
  });
  const [typing, setTyping] = useState(false);
  const chatBoxRef = useRef(null);

  
   
  const API_URL =import.meta.env.VITE_API_URL || 'http://localhost:8080';
  

  const handleReset = async () => {
    try {
      const res = await axios.post(`${API_URL}/api/reset-chat`);
      console.log(res.data);
      setChat([]);
      localStorage.removeItem("chatHistory"); // ✅ localStorage bhi clear
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
      const res = await axios.post(`${API_URL}/api/chat`, { message });
      setTyping(false);

      const finalChat = [
        ...updatedChat,
        { role: "assistant", content: res.data.reply },
      ];
      setChat(finalChat);
      localStorage.setItem("chatHistory", JSON.stringify(finalChat)); // ✅ Save in localStorage
    } catch (error) {
      console.log(error);
      setTyping(false);
    }
  };

  // ✅ Whenever chat update ho, localStorage update karo
  useEffect(() => {
    localStorage.setItem("chatHistory", JSON.stringify(chat));
  }, [chat]);

  // ✅ Scroll always bottom
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [chat]);



  return (
    <div className="flex flex-col sm:h-[90vh] h-[85vh] bg-gray-100">
      {/* Messages Area */}
      <div ref={chatBoxRef} className="flex-1 p-4 overflow-y-auto">
        {chat.map((msg, i) => (
          <div
            key={i}
            className={`p-3 mb-3 rounded-xl text-white break-words 
              ${
                msg.role === "user"
                  ? "bg-amber-800 self-end ml-auto lg:max-w-[30%] max-w-[60%] sm:max-w-[40%] rounded-tr-none text-sm md:text-[15px]"
                  : "bg-gray-800 self-start lg:max-w-[50%] max-w-[75%] rounded-tl-none break-words whitespace-pre-wrap"
              } transition-all duration-200`}
          >
          <ReactMarkdown remarkPlugins={[remarkGfm]} >
              {msg.content}
          </ReactMarkdown>
           
          </div>
        ))}
        {typing && <div className="text-gray-500 italic mb-2">Typing...</div>}
      </div>

      {/* Input Box */}
      <div className="p-3 bg-white flex items-center gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
           onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type your message..."
          className="flex-1 p-2 border-none rounded-lg outline-none  "
        />
        <button
          onClick={handleSend}
         
          className="px-2 sm:px-4 py-2 bg-amber-800 text-white rounded-lg hover:bg-amber-700 duration-200"
        >
         <ArrowUp/>
        </button>
        <button
          onClick={handleReset}
          className="px-2 sm:px-4 ml-1 sm:ml-5 py-2 bg-amber-800 text-white rounded-lg hover:bg-amber-700 duration-200"
        >
         <Delete/>
        </button>
      </div>
    </div>
  );
};

export default ChatScreen;
