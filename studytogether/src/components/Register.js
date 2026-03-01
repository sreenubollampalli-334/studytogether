import { useState } from "react";

function Register({ setCurrentPage }) {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = () => {
    // Save to localStorage (temporary demo purpose)
    localStorage.setItem("registeredUser", JSON.stringify(formData));

    alert("Registration Successful ✅");

    // Redirect to login page
    setCurrentPage("login");
  };

  return (
    <div className="register-page">
      <div className="register-card">
        <h2>Create Account</h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />

        <button className="register-btn" onClick={handleRegister}>
          Register
        </button>

        <p
          className="go-login"
          onClick={() => setCurrentPage("login")}
        >
          Already have an account? Login
        </p>
      </div>
    </div>
  );
}

export default Register;