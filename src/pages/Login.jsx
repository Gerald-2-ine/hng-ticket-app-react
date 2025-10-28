import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/auth.css";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const storedUsers = JSON.parse(localStorage.getItem("ticketapp_users")) || [];
    const validUser = storedUsers.find(
      (user) => user.email === formData.email && user.password === formData.password
    );

    if (validUser) {
      setSuccess("✅ Login successful! Redirecting to dashboard...");
      localStorage.setItem("ticketapp_session", JSON.stringify({ email: validUser.email }));

      setTimeout(() => {
        setSuccess("");
        navigate("/dashboard");
      }, 1500);
    } else {
      setError("❌ Invalid email or password. Please try again.");
      setTimeout(() => setError(""), 2000);
    }
  };

  return (
    <div className="login-container">
      {success && <div className="alert success">{success}</div>}
      {error && <div className="alert error">{error}</div>}

      <div className="login-card">
        <h2>Welcome Back 👋</h2>
        <p>Login to continue managing your tickets</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn-primary">Login</button>

          <p className="switch-text">
            Don’t have an account? <Link to="/auth/signup">Sign up</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
