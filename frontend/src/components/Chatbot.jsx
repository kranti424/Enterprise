import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./Chatbot.css"; // Ensure this file exists

const Chatbot = () => {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([]);
  const chatEndRef = useRef(null);

  const sendMessage = async () => {
    if (!query.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { text: query, sender: "user" }]);

    try {
      const response = await axios.post("http://localhost:5000/chatbot", { query });
      setMessages((prev) => [...prev, { text: response.data.reply, sender: "bot" }]);
    } catch (error) {
      setMessages((prev) => [...prev, { text: "Error getting response", sender: "bot" }]);
    }

    setQuery(""); // Clear input
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat-container">
      <h2 className="chat-title">Chatbot</h2>

      {/* Chat Display */}
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            <strong>{msg.sender === "user" ? "You: " : "Bot: "}</strong> {msg.text}
          </div>
        ))}
        <div ref={chatEndRef}></div>
      </div>

      {/* Input Field & Button */}
      <div className="input-area">
        <input
          type="text"
          className="chat-input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type your message..."
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button className="send-button" onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chatbot;
