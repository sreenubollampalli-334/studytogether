import { useState, useEffect, useRef } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import "../conversation.css";

function Conversation({ user, currentUser, setCurrentPage }) {

  // ===============================
  // 🔹 STATE SECTION
  // ===============================

  const [showWarning, setShowWarning] = useState(true);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false);

  // 🔹 WebSocket client reference
  const stompClient = useRef(null);

  // 🔹 Auto scroll reference
  const chatEndRef = useRef(null);

  // ===============================
  // 🔹 CONNECT TO BACKEND WEBSOCKET
  // ===============================
  useEffect(() => {

    if (!currentUser) return;

    const socket = new SockJS("http://localhost:8080/ws");

    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      debug: (str) => console.log(str),
    });

    // 🔹 When connected
    client.onConnect = () => {
      console.log("✅ Connected to WebSocket");
      setIsConnected(true);

      // Subscribe to personal queue
      client.subscribe(
        `/user/${currentUser.id}/queue/messages`,
        (payload) => {
          const receivedMessage = JSON.parse(payload.body);
          setMessages(prev => [...prev, receivedMessage]);
        }
      );
    };

    // 🔹 When disconnected
    client.onDisconnect = () => {
      console.log("❌ Disconnected");
      setIsConnected(false);
    };

    client.onStompError = (frame) => {
      console.error("Broker error: ", frame.headers["message"]);
    };

    client.activate();
    stompClient.current = client;

    // Cleanup
    return () => {
      client.deactivate();
    };

  }, [currentUser]);

  // ===============================
  // 🔹 AUTO SCROLL WHEN NEW MESSAGE
  // ===============================
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ===============================
  // 🔹 SEND MESSAGE
  // ===============================
  const send = () => {

    if (!isConnected) {
      alert("Connecting to server... Please wait.");
      return;
    }

    if (message.trim() === "") return;

    const chatMessage = {
      senderId: currentUser.id,
      receiverId: user.id,
      content: message,
      timestamp: new Date()
    };

    stompClient.current.publish({
      destination: "/app/chat",
      body: JSON.stringify(chatMessage)
    });

    // Show immediately in sender UI
    setMessages(prev => [...prev, chatMessage]);
    setMessage("");
  };

  // ===============================
  // 🔹 SAFETY CHECK
  // ===============================
  if (!user || !currentUser) {
    return <div className="loading">Loading Chat...</div>;
  }

  return (
    <div className="conversation-page">

      {/* ================= HEADER ================= */}
      <div className="conversation-header">
        <button onClick={() => setCurrentPage("home")}>
          ← Back
        </button>

        <div className="chat-user-info">
          <h3>{user.name}</h3>
          <span className="connection-status">
            {isConnected ? "🟢 Online" : "🔴 Connecting..."}
          </span>
        </div>
      </div>

      {/* ================= WARNING BOX ================= */}
      {showWarning ? (
        <div className="warning-box">
          ⚠️ Be respectful. Follow community guidelines.
          <button onClick={() => setShowWarning(false)}>
            Continue
          </button>
        </div>
      ) : (

        /* ================= CHAT AREA ================= */
        <div className="chat-area">

          <div className="messages-container">

            {messages.map((msg, index) => (
              <div
                key={index}
                className={
                  msg.senderId === currentUser.id
                    ? "message-bubble sent"
                    : "message-bubble received"
                }
              >
                <div>{msg.content}</div>
                <small>
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </small>
              </div>
            ))}

            <div ref={chatEndRef}></div>

          </div>

          {/* ================= INPUT AREA ================= */}
          <div className="input-area">
            <input
              type="text"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              disabled={!isConnected}
            />

            <button onClick={send} disabled={!isConnected}>
              {isConnected ? "Send" : "Connecting..."}
            </button>
          </div>

        </div>
      )}
    </div>
  );
}

export default Conversation;