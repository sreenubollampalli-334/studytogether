import { useState } from "react";
import { UserProvider } from "./components/UserContext";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Register from "./components/Register";
import ChatBot from "./components/ChatBot";
import SearchResults from "./components/SearchResults";
import Conversation from "./components/Conversation";

import "./Style.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [searchQuery, setSearchQuery] = useState("");
  const [acceptedUser, setAcceptedUser] = useState(null);

  const [currentUser, setCurrentUser] = useState({
    id: 1,
    name: "Sreenu",
  });

 return (
  <UserProvider>

    {/* NAVBAR (Hide for about page also) */}
    {!["chatbot", "search", "conversation"].includes(currentPage) && (
      <Navbar
        setCurrentPage={setCurrentPage}
        setSearchQuery={setSearchQuery}
      />
    )}

    {/* PAGES */}

    {currentPage === "home" && (
      <Home
        setCurrentPage={setCurrentPage}
        setAcceptedUser={setAcceptedUser}
      />
    )}

    {currentPage === "profile" && <Profile />}

  

    {currentPage === "login" && (
      <Login
        setCurrentPage={setCurrentPage}
        setCurrentUser={setCurrentUser}
      />
    )}

    {currentPage === "register" && (
      <Register setCurrentPage={setCurrentPage} />
    )}

    {currentPage === "chatbot" && (
      <ChatBot setCurrentPage={setCurrentPage} />
    )}

    {currentPage === "search" && (
      <SearchResults
        searchQuery={searchQuery}
        setCurrentPage={setCurrentPage}
      />
    )}

    {currentPage === "conversation" && (
      <Conversation
        user={acceptedUser}
        currentUser={currentUser}
        setCurrentPage={setCurrentPage}
      />
    )}

   
    

  </UserProvider>
);
}

export default App;