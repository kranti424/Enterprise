import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Button, Form, ListGroup, Spinner } from "react-bootstrap";
import "./Email.css"; // Ensure you create this file for additional styling

const Email = () => {
  const [tickets, setTickets] = useState([]);
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch existing tickets from the backend
  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const response = await axios.get("http://localhost:5000/tickets");
      setTickets(response.data); // Ensure backend sends an array
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
  };

  // Create a new ticket
  const createTicket = async () => {
    if (!subject || !description) {
      alert("Please fill in both Subject and Description.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/tickets", { subject, description });

      alert(response.data.message);
      setTickets([...tickets, response.data.ticket]); // Update UI with the new ticket
      setSubject("");
      setDescription("");
    } catch (error) {
      alert("Error creating ticket");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="email-container">
      <h2 className="email-title">📩 Email & Support Ticket Management</h2>

      {/* Ticket Submission Form */}
      <Card className="email-card">
        <Card.Body>
          <h4>📝 Submit a Support Ticket</h4>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Subject</Form.Label>
              <Form.Control
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Enter ticket subject"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your issue"
              />
            </Form.Group>

            <Button variant="primary" onClick={createTicket} disabled={loading}>
              {loading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : "Submit Ticket"}
            </Button>
          </Form>
        </Card.Body>
      </Card>

      {/* Display Existing Tickets */}
      <Card className="email-card">
        <Card.Body>
          <h4>📌 Existing Support Tickets</h4>
          {tickets.length > 0 ? (
            <ListGroup>
              {tickets.map((ticket) => (
                <ListGroup.Item key={ticket._id} className="ticket-item">
                  <strong>📌 {ticket.subject}</strong>
                  <p>Status: <span className={`status ${ticket.status.toLowerCase()}`}>{ticket.status}</span></p>
                </ListGroup.Item>
              ))}
            </ListGroup>
          ) : (
            <p>No tickets found.</p>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default Email;
