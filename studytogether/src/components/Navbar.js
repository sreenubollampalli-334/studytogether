import { useState, useRef, useEffect, useContext } from "react";
import { User } from "lucide-react";
import { UserContext } from "./UserContext";

function Navbar({ setCurrentPage, setSearchQuery }) {

  const { user } = useContext(UserContext);

  const [expand, setExpand] = useState(false);
  const [query, setQuery] = useState("");

  /* ================= THEME STATE ================= */

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "ocean"   // 🔥 Default Ocean
  );

  const searchRef = useRef(null);

  /* Apply theme */
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  /* Cycle Theme Function */
  const toggleTheme = () => {
    if (theme === "ocean") {
      setTheme("dark");
    } else if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("ocean");
    }
  };

  /* Close search outside */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setExpand(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = () => {
    if (query.trim() !== "") {
      setSearchQuery(query);
      setCurrentPage("search");
      setExpand(false);
    }
  };

  return (
    <div className="top-navbar">

      {/* LEFT */}
      <div className="nav-left">
        <button
          className="icon-button"
          onClick={() => setCurrentPage("home")}
        >
          Home
        </button>
      </div>

      {/* SEARCH */}
      <div className="nav-center" ref={searchRef}>
        <div className={`search-container ${expand ? "active" : ""}`}>
          <input
            type="text"
            className="search-input"
            placeholder="Search courses..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <button
            className="search-icon"
            onClick={() => {
              if (!expand) setExpand(true);
              else handleSearch();
            }}
          >
            🔍
          </button>
        </div>
      </div>

      {/* RIGHT */}
      <div className="nav-right">

        {/* 🔥 SINGLE THEME BUTTON */}
        <button className="theme-toggle-btn" onClick={toggleTheme}>
          {theme === "ocean" && "🌊"}
          {theme === "dark" && "🌙"}
          {theme === "light" && "🌞"}
        </button>

        <button
          className="nav-button"
          onClick={() => setCurrentPage("register")}
        >
          Sign Up
        </button>

        <button
          className="nav-button signup"
          onClick={() => setCurrentPage("login")}
        >
          Sign In
        </button>

        <button
          className="profile-btn"
          onClick={() => setCurrentPage("profile")}
        >
          {user.profileImage ? (
            <img
              src={user.profileImage}
              alt="Profile"
              className="nav-profile-img"
            />
          ) : (
            <User size={20} />
          )}
        </button>
     

      </div>
    </div>
  );
}

export default Navbar;