import React from "react";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Dashboard</h1>
      <div className="dashboard-cards">
        <div className="card">
          <h3>Total Users</h3>
          <p>1,234</p>
        </div>
        <div className="card">
          <h3>Active Tickets</h3>
          <p>25</p>
        </div>
        <div className="card">
          <h3>Resolved Issues</h3>
          <p>98%</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
