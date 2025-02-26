// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import TicketPage from './components/TicketPage';  // Assuming you have another page for tickets

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/tickets" element={<TicketPage />} />
      </Routes>
    </Router>
  );
}

export default App;
