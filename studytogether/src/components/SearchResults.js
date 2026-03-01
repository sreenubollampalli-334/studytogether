import { useState } from "react";
import students from "../data/Students";
import "../searchResults.css";

function SearchResults({ searchQuery = "", setCurrentPage }) {

  const [connectionStatus, setConnectionStatus] = useState({});

  const query = searchQuery.toLowerCase();

  const filteredStudents = students.filter(student =>
    (student.name || "").toLowerCase().includes(query) ||
    (student.course || "").toLowerCase().includes(query)
  );

  const handleConnect = (id) => {

    setConnectionStatus(prev => ({
      ...prev,
      [id]: "loading"
    }));

    // Simulate API delay
    setTimeout(() => {
      setConnectionStatus(prev => ({
        ...prev,
        [id]: "requested"
      }));
    }, 1000);
  };

  return (
    <div className="search-page">

      <div className="search-header">
        <button
          className="search-back-btn"
          onClick={() => setCurrentPage("home")}
        >
          ← Back
        </button>

        <h2>Results for "{searchQuery}"</h2>
      </div>

      <div className="search-results-grid">
        {filteredStudents.length > 0 ? (
          filteredStudents.map(student => {

            const status = connectionStatus[student.id];

            return (
              <div key={student.id} className="search-card">
                <h3>{student.name}</h3>
                <p>{student.course}</p>

                <button
                  className={`search-connect-btn ${
                    status === "requested" ? "requested" : ""
                  }`}
                  onClick={() => handleConnect(student.id)}
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
          })
        ) : (
          <div className="no-results">
            <p>No students found.</p>
          </div>
        )}
      </div>

    </div>
  );
}

export default SearchResults;