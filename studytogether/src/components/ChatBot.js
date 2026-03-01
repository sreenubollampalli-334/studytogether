import { useState } from "react";
import "../chatbot.css";

function ChatBot({ setCurrentPage }) {

  // Avatar Images (Online)
  const botImg = "https://cdn-icons-png.flaticon.com/512/4712/4712109.png";
  const userImg = "https://cdn-icons-png.flaticon.com/512/847/847969.png";

  const services = [
    "🔍 Search Students",
    "🤝 Send Connection Request",
    "👤 View Profile",
    "📝 Register Account",
    "🔐 Login Help",
    "📚 Explore Courses",
    "❌ Cancel Connection Request",
    "💬 How to Collaborate",
    "⚙️ Account Settings",
    "🛠 Report a Bug",
    "📩 Contact Support"
  ];

  const [messages, setMessages] = useState([
    {
      text: "Hello 👋 I am StudyTogether Assistant. How can I help you today?",
      sender: "bot"
    }
  ]);

  const handleServiceClick = (service) => {

    const cleanService = service.replace(/^[^\w]+/, "");

    const userMessage = { text: service, sender: "user" };

    const responses = {
      "Search Students":
        "You can search students using the search bar on the home page.",

      "Send Connection Request":
        "Click the Connect button on any student card to send a request.",

      "View Profile":
        "Go to the profile page from the navbar to view your profile.",

      "Register Account":
        "Click Register in the navbar to create a new account.",

      "Login Help":
        "Use your registered email and password to login from the login page.",

      "Explore Courses":
        "Scroll through the student section to explore different courses.",

      "Cancel Connection Request":
        "You can manage connection requests in your profile section.",

      "How to Collaborate":
        "Once connected, you can discuss topics and collaborate together.",

      "Account Settings":
        "Profile page allows you to update your personal details.",

      "Report a Bug":
        "Please describe the issue and we will fix it as soon as possible.",

      "Contact Support":
        "You can reach us at support@studytogether.com"
    };

    const botMessage = {
      text: responses[cleanService] || "Sorry, I didn't understand that.",
      sender: "bot"
    };

    setMessages([...messages, userMessage, botMessage]);
  };

  return (
    <div className="chat-page">

      <div className="chat-header">
        <button
          className="back-btn"
          onClick={() => setCurrentPage("home")}
        >
          ← Back
        </button>
        <h2>StudyTogether Help Assistant 🤖</h2>
      </div>

      <div className="chat-container">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-row ${msg.sender}`}>

            {msg.sender === "bot" && (
              <img src={botImg} alt="bot" className="avatar" />
            )}

            <div className={`chat-message ${msg.sender}`}>
              {msg.text}
            </div>

            {msg.sender === "user" && (
              <img src={userImg} alt="user" className="avatar" />
            )}

          </div>
        ))}
      </div>

      <div className="chat-input-area">
        {services.map((service, index) => (
          <button
            key={index}
            className="service-btn"
            onClick={() => handleServiceClick(service)}
          >
            {service}
          </button>
        ))}
      </div>

    </div>
  );
}

export default ChatBot;