import { useState, useRef } from "react";
import students from "../data/Students";
import "../Style.css";

function Home({ setCurrentPage, setAcceptedUser }) {

  const [connectionStatus, setConnectionStatus] = useState({});

  const handleConnect = (student) => {

    // 1️⃣ Loading state
    setConnectionStatus(prev => ({
      ...prev,
      [student.id]: "loading"
    }));

    setTimeout(() => {

      // 2️⃣ Requested state
      setConnectionStatus(prev => ({
        ...prev,
        [student.id]: "requested"
      }));

      // 🔊 Play sound
      const audio = new Audio(
        "https://cdn.pixabay.com/download/audio/2022/03/15/audio_115b9b4b9b.mp3?filename=click-124467.mp3"
      );
      audio.play().catch(() => {});

      // 3️⃣ Simulate partner acceptance after 3 seconds
      setTimeout(() => {

        setAcceptedUser(student);
        setCurrentPage("conversation");

      }, 3000);

    }, 1000);
  };

  return (
    <div className="main-container">

      <div className="content">
        <h1>Welcome to StudyTogether</h1>
        <p>Connect • Collaborate • Achieve Your Goals</p>
      </div>

      <section className="students-section">
        <h2>Students Learning Different Courses 🎓</h2>

        <div className="students-grid">
          {students.map((student) => {

            const status = connectionStatus[student.id];

            return (
              <div key={student.id} className="student-card">
                <h3>{student.name}</h3>
                <p>{student.course}</p>

                <button
                  className={`connect-btn ${
                    status === "requested" ? "requested" : ""
                  }`}
                  onClick={() => handleConnect(student)}
                  disabled={status === "loading" || status === "requested"}
                >
                  {status === "loading"
                    ? "Sending..."
                    : status === "requested"
                    ? "Requested ✓"
                    : "Connect"}
                </button>

              </div>
            );
          })}
        </div>

      </section>

      <button
        className="help-button"
        onClick={() => setCurrentPage("chatbot")}
      >
        <i className="bi bi-chat-dots-fill"></i>
      </button>
   <footer className="interactive-footer">
  <div className="footer-content">

    <h3 className="footer-logo">StudyTogether</h3>

    <p className="footer-tagline">
      Learn • Connect • Grow
    </p>

    <div className="footer-hover-text">
      Building the future of student collaboration 🚀
    </div>

  </div>

  <div className="footer-bottom">
    © {new Date().getFullYear()} StudyTogether | Professional Version
  </div>
</footer>
  
    

    </div>
  );
}

export default Home;