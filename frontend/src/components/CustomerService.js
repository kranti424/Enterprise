import React from 'react';
import { Paper, Typography, Button } from '@mui/material';

function CustomerService() {
  return (
    <Paper style={{ padding: '20px' }}>
      <Typography variant="h5" gutterBottom>
        Customer Service Interactions
      </Typography>
      <Typography variant="body1" component="p">
        Handle customer inquiries, manage support tickets, and interact with chatbots.
      </Typography>
      <Button variant="contained" color="success">
        Chat with Chatbot
      </Button>
      <Button variant="contained" color="success" style={{ marginTop: '10px' }}>
        Manage Support Tickets
      </Button>
    </Paper>
  );
}

export default CustomerService;
