import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">Enterprise Dashboard</Link>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item"><Link className="nav-link" to="/">Dashboard</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/tickets">Tickets</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/chatbot">Chatbot</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/email">Emails</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/ocr">OCR</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
