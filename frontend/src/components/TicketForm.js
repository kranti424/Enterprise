import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";

function TicketForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send ticket data to the backend
    axios.post("http://localhost:5000/create_ticket", { title, description })
      .then(response => {
        console.log(response.data);
        setTitle("");
        setDescription("");
      })
      .catch(error => console.error("Error creating ticket:", error));
  };

  return (
    <Box sx={{ marginTop: 4 }}>
      <Typography variant="h6">Create a New Support Ticket</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Ticket Title"
          variant="outlined"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          multiline
          rows={4}
          sx={{ marginBottom: 2 }}
        />
        <Button type="submit" variant="contained" color="primary">
          Create Ticket
        </Button>
      </form>
    </Box>
  );
}

export default TicketForm;
