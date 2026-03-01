function Login({ setCurrentPage }) {
  return (
    <div className="login-page">
      <div className="login-card">
        <h2>Welcome Back 👋</h2>

        <input type="email" placeholder="Enter Email" />
        <input type="password" placeholder="Enter Password" />

        <button className="login-btn">
          Login
        </button>

        <p
          className="back-home"
          onClick={() => setCurrentPage("home")}
        >
          ← Back to Home
        </p>
      </div>
    </div>
  );
}

export default Login;