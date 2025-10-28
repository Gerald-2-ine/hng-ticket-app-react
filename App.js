import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Tickets from "./pages/Tickets";
import { TicketProvider } from "./context/TicketContext";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("ticketapp_session")
  );

  // Watch for login/logout changes
  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(!!localStorage.getItem("ticketapp_session"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <TicketProvider>
      <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<Signup />} />

        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/auth/login" replace />}
        />
        <Route
          path="/tickets"
          element={isAuthenticated ? <Tickets /> : <Navigate to="/auth/login" replace />}
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
    </TicketProvider>
  );
}

export default App;
