import React from "react";
import "../styles/LandingPage.css";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>TicketFlow</h1>
          <p>Manage your support tickets effortlessly — anytime, anywhere.</p>
          <div className="hero-buttons">
            <Link to="/auth/login" className="btn primary">Login</Link>
            <Link to="/auth/signup" className="btn secondary">Get Started</Link>
          </div>
        </div>

        {/* Decorative Circles */}
        <div className="circle circle1"></div>
        <div className="circle circle2"></div>

        {/* Wave SVG */}
        <svg
          className="wave"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#ffffff"
            fillOpacity="1"
            d="M0,160L60,165.3C120,171,240,181,360,197.3C480,213,600,235,720,224C840,213,960,171,1080,154.7C1200,139,1320,149,1380,154.7L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          ></path>
        </svg>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Why TicketFlow?</h2>
        <div className="feature-boxes">
          <div className="feature-card">
            <h3>🎟 Easy Ticketing</h3>
            <p>Create and manage your tickets with ease in just a few clicks.</p>
          </div>
          <div className="feature-card">
            <h3>📊 Real-Time Dashboard</h3>
            <p>Monitor your open, in-progress, and closed tickets effortlessly.</p>
          </div>
          <div className="feature-card">
            <h3>🔒 Secure Access</h3>
            <p>Your data stays safe — only authorized users can access the system.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <p>© 2025 TicketFlow. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
