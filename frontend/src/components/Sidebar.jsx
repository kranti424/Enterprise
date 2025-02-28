import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Dashboard</h2>
      <ul>
        <li>
          <Link to="/data-entry">Data Entry</Link>
        </li>
        <li>
          <Link to="/data-processing">Data Processing</Link>
        </li>
        <li>
          <Link to="/customer-interaction">Customer Interaction</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
