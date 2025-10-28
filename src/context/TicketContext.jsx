import React, { createContext, useState, useEffect } from "react";

export const TicketContext = createContext();

export const TicketProvider = ({ children }) => {
  const [tickets, setTickets] = useState(() => {
    const stored = localStorage.getItem("tickets");
    return stored ? JSON.parse(stored) : [];
  });

  // Save tickets to localStorage when updated
  useEffect(() => {
    localStorage.setItem("tickets", JSON.stringify(tickets));
  }, [tickets]);

  // Add new ticket
  const addTicket = (ticket) => {
    const newTickets = [...tickets, ticket];
    setTickets(newTickets);
  };

  // Edit ticket
  const updateTicket = (id, updated) => {
    setTickets(tickets.map((t) => (t.id === id ? { ...t, ...updated } : t)));
  };

  // Delete ticket
  const deleteTicket = (id) => {
    setTickets(tickets.filter((t) => t.id !== id));
  };

  return (
    <TicketContext.Provider value={{ tickets, addTicket, updateTicket, deleteTicket }}>
      {children}
    </TicketContext.Provider>
  );
};
