import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import "./homepage.css"; 

const Homepage = () => {
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userMessage, setUserMessage] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate(); 
  const handleLogin = () => {
    
    if (username.trim() !== "" && password.trim() !== "") {
      setIsLoggedIn(true);
      navigate("/shop"); 
    }
  };

  const sendMessage = async () => {
    if (userMessage.trim() === "") return;

    const newMessages = [...messages, { sender: "user", text: userMessage }];
    setMessages(newMessages);
    setUserMessage("");

    try {
      const response = await fetch("http://localhost/chatbot.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await response.json();
      setMessages([...newMessages, { sender: "bot", text: data.response }]);
    } catch (error) {
      console.error("Error:", error);
      setMessages([...newMessages, { sender: "bot", text: "❌ Service Error." }]);
    }
  };

  return (
    <div className="homepage">
      <header className="header">
        <div className="logo-container">
          <img src="/images/Dali.jpg" alt="DALI Logo" className="logo" />  
          <h1>DALI Everyday Grocery<br /><span className="small-text">Shop Smart, Save More with DALI Everyday Grocery!</span></h1>
        </div>
        <nav>
          <ul>
            <li><Link to="/about">About Store</Link></li>
            <li><Link to="/find">Find Store</Link></li>
            <li><Link to="/jobs">Jobs</Link></li>
          </ul>
        </nav>
      </header>

      <section className="banner">
        <h2>Start shopping today and enjoy great savings.<br />
        Because at DALI, we don't just sell groceries—we help you live better every day!</h2>
      </section>

      <section className="login-section">
        <h3>Login</h3>
        <input 
          type="text" 
          placeholder="Username" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        <button onClick={handleLogin}>Login</button>
      </section>

      <button className="chatbot-btn" onClick={() => setShowChat(!showChat)}>💬 Chat</button>

      <div className={`chatbot-window ${showChat ? "active" : ""}`}>
        <button className="close-chat" onClick={() => setShowChat(false)}>❌</button>
        <div className="chat-messages">
          {messages.map((msg, index) => (
            <div key={index} className={msg.sender === "user" ? "user-msg" : "bot-msg"}>
              {msg.text}
            </div>
          ))}
        </div>
        <input 
          type="text" 
          value={userMessage} 
          onChange={(e) => setUserMessage(e.target.value)} 
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>

      {/* Social Media Links */}
      <footer className="footer">
        <div className="social-links">
          <a href="https://www.facebook.com/share/1Uvz44c5Gb/" target="_blank" rel="noopener noreferrer">
            <img src="/images/facebook.jpg" alt="Facebook" className="social-icon" />
          </a>
          <a href="https://www.instagram.com/dalieverydaygrocery?igsh=MXN4cHc2cWNoYzRxYg==" target="_blank" rel="noopener noreferrer">
            <img src="/images/instagram.jpg" alt="Instagram" className="social-icon" />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;
