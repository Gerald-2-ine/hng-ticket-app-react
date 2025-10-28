import React, { useState, useEffect } from "react";
import "../styles/tickets.css";
import { Link } from "react-router-dom";
import Toast from "../context/Toast"; // ✅ Correct import

function Tickets() {
  const [tickets, setTickets] = useState([]);
  const [newTicket, setNewTicket] = useState({ title: "", description: "" });
  const [editingTicket, setEditingTicket] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Toast State
  const [toast, setToast] = useState({ message: "", type: "" });

  const showToast = (message, type = "info") => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: "", type: "" }), 3000);
  };

  // Load tickets
  useEffect(() => {
    const savedTickets = JSON.parse(localStorage.getItem("ticketapp_tickets")) || [];
    setTickets(savedTickets);
  }, []);

  // Save tickets to localStorage
  const saveTickets = (updatedTickets) => {
    localStorage.setItem("ticketapp_tickets", JSON.stringify(updatedTickets));
    window.dispatchEvent(new Event("ticketsUpdated"));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTicket({ ...newTicket, [name]: value });
  };

  const handleAddTicket = (e) => {
    e.preventDefault();
    if (!newTicket.title.trim() || !newTicket.description.trim()) {
      showToast("Please fill in all fields", "error");
      return;
    }

    const newEntry = {
      id: Date.now(),
      ...newTicket,
      status: "open",
    };

    const updated = [newEntry, ...tickets];
    setTickets(updated);
    saveTickets(updated);
    setNewTicket({ title: "", description: "" });
    setShowModal(false);

    showToast("Ticket added successfully!", "success");
  };

  const handleDelete = (id) => {
    const updated = tickets.filter((ticket) => ticket.id !== id);
    setTickets(updated);
    saveTickets(updated);
    showToast("Ticket deleted successfully!", "error");
  };

  const handleEdit = (ticket) => {
    setEditingTicket(ticket);
    setShowModal(true);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const updated = tickets.map((ticket) =>
      ticket.id === editingTicket.id ? editingTicket : ticket
    );
    setTickets(updated);
    saveTickets(updated);
    setEditingTicket(null);
    setShowModal(false);

    showToast("Ticket updated successfully!", "success");
  };

  const handleStatusChange = (id, newStatus) => {
    const updated = tickets.map((ticket) =>
      ticket.id === id ? { ...ticket, status: newStatus.toLowerCase() } : ticket
    );
    setTickets(updated);
    saveTickets(updated);
    showToast(`Status changed to ${newStatus}`, "info");
  };

  return (
    <div className="tickets-container">
      <h2>🎫 Ticket Management</h2>
      <Link to="/Dashboard" className="btn-back-dashboard">
        ← Back
      </Link>
      <button className="add-ticket-btn" onClick={() => setShowModal(true)}>
        + Add New Ticket
      </button>

      <div className="ticket-list">
        {tickets.length === 0 ? (
          <p>No tickets yet. Add one above!</p>
        ) : (
          tickets.map((ticket) => (
            <div key={ticket.id} className="ticket-card">
              <h3>{ticket.title}</h3>
              <p>{ticket.description}</p>
              <p className={`status ${ticket.status}`}>{ticket.status}</p>

              <div className="ticket-actions">
                <select
                  value={ticket.status}
                  onChange={(e) => handleStatusChange(ticket.id, e.target.value)}
                >
                  <option value="open">Open</option>
                  <option value="in-progress">In Progress</option>
                  <option value="closed">Closed</option>
                </select>
                <button onClick={() => handleEdit(ticket)} className="edit-btn">
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(ticket.id)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ✅ Modal Section */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>{editingTicket ? "Edit Ticket" : "Create New Ticket"}</h3>
            <form
              onSubmit={editingTicket ? handleUpdate : handleAddTicket}
              className="modal-form"
            >
              <input
                type="text"
                name="title"
                placeholder="Ticket Title"
                value={editingTicket ? editingTicket.title : newTicket.title}
                onChange={(e) =>
                  editingTicket
                    ? setEditingTicket({
                        ...editingTicket,
                        title: e.target.value,
                      })
                    : handleChange(e)
                }
              />
              <textarea
                name="description"
                placeholder="Ticket Description"
                value={
                  editingTicket
                    ? editingTicket.description
                    : newTicket.description
                }
                onChange={(e) =>
                  editingTicket
                    ? setEditingTicket({
                        ...editingTicket,
                        description: e.target.value,
                      })
                    : handleChange(e)
                }
              />
              <div className="modal-buttons">
                <button type="submit" className="save-btn">
                  {editingTicket ? "Update" : "Add Ticket"}
                </button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => {
                    setEditingTicket(null);
                    setShowModal(false);
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ✅ Toast Notification */}
      {toast.message && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ message: "", type: "" })}
        />
      )}
    </div>
  );
}

export default Tickets;
