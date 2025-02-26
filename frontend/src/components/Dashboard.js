// src/components/Dashboard.js
import React from 'react';
import { Container, Grid, Paper, Typography, Button } from '@mui/material';
import EmailForm from './EmailForm';
import TicketForm from './TicketForm';
import Chatbot from './Chatbot';

const Dashboard = () => {
  return (
    <Container>
      <Typography variant="h3" gutterBottom align="center">
        Business Automation Dashboard
      </Typography>

      <Grid container spacing={3}>
        {/* Email Section */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} style={{ padding: '20px' }}>
            <Typography variant="h5" gutterBottom>
              Send Email
            </Typography>
            <EmailForm />
          </Paper>
        </Grid>

        {/* Ticket Management Section */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} style={{ padding: '20px' }}>
            <Typography variant="h5" gutterBottom>
              Manage Tickets
            </Typography>
            <TicketForm />
          </Paper>
        </Grid>

        {/* Chatbot Section */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} style={{ padding: '20px' }}>
            <Typography variant="h5" gutterBottom>
              Chatbot Interaction
            </Typography>
            <Chatbot />
          </Paper>
        </Grid>

        {/* Task Automation Section */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} style={{ padding: '20px' }}>
            <Typography variant="h5" gutterBottom>
              Data Entry & Automation
            </Typography>
            <Button variant="contained" color="primary">
              Start Automation
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
