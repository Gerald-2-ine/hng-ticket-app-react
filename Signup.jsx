import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/auth.css";

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
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

    const { name, email, password, confirmPassword } = formData;

    if (!name || !email || !password || !confirmPassword) {
      setError("❌ All fields are required.");
      setTimeout(() => setError(""), 2000);
      return;
    }

    if (password.length < 6) {
      setError("❌ Password must be at least 6 characters long.");
      setTimeout(() => setError(""), 2000);
      return;
    }

    if (password !== confirmPassword) {
      setError("❌ Passwords do not match.");
      setTimeout(() => setError(""), 2000);
      return;
    }

    const storedUsers = JSON.parse(localStorage.getItem("ticketapp_users")) || [];
    const userExists = storedUsers.some((user) => user.email === email);

    if (userExists) {
      setError("⚠️ This email is already registered. Please log in.");
      setTimeout(() => setError(""), 2000);
      return;
    }

    const newUser = { name, email, password };
    storedUsers.push(newUser);
    localStorage.setItem("ticketapp_users", JSON.stringify(storedUsers));

    setSuccess("✅ Signup successful! Redirecting to login...");
    setTimeout(() => {
      setSuccess("");
      navigate("/auth/login");
    }, 1500);
  };

  return (
    <div className="signup-container">
      {success && <div className="alert success">{success}</div>}
      {error && <div className="alert error">{error}</div>}

      <div className="signup-card">
        <h2>Create an Account ✨</h2>
        <p>Join the ticket management system today</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

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
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn-primary">Sign Up</button>

          <p className="switch-text">
            Already have an account? <Link to="/auth/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
