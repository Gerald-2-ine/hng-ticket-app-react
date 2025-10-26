import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);

  const loadTickets = () => {
    const storedTickets = JSON.parse(localStorage.getItem("ticketapp_tickets")) || [];
    setTickets(storedTickets);
  };

  useEffect(() => {
    loadTickets();

    // Listen to both browser storage and our custom ticket update event
    const handleTicketUpdate = () => loadTickets();
    window.addEventListener("storage", loadTickets);
    window.addEventListener("ticketsUpdated", handleTicketUpdate);

    return () => {
      window.removeEventListener("storage", loadTickets);
      window.removeEventListener("ticketsUpdated", handleTicketUpdate);
    };
  }, []);

  const totalTickets = tickets.length;
  const openTickets = tickets.filter((t) => t.status === "open").length;
  const inProgressTickets = tickets.filter((t) => t.status === "in-progress").length;
  const closedTickets = tickets.filter((t) => t.status === "closed").length;

  const handleLogout = () => {
    localStorage.removeItem("ticketapp_session");
    navigate("/auth/login");
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>🎟️ Ticket Management Dashboard</h1>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </header>

      <section className="stats-section">
        <div className="stat-card open">
          <h3>Open Tickets</h3>
          <span className="badge open">Open</span>
          <p>{openTickets}</p>
        </div>

        <div className="stat-card in-progress">
          <h3>In Progress</h3>
          <span className="badge in-progress">In Progress</span>
          <p>{inProgressTickets}</p>
        </div>

        <div className="stat-card closed">
          <h3>Closed Tickets</h3>
          <span className="badge closed">Closed</span>
          <p>{closedTickets}</p>
        </div>

        <div className="stat-card total">
          <h3>Total Tickets</h3>
          <p>{totalTickets}</p>
        </div>
      </section>

      <section className="nav-links">
        <Link to="/tickets" className="btn-primary">
          Manage Tickets
        </Link>
      </section>
    </div>
  );
}

export default Dashboard;
