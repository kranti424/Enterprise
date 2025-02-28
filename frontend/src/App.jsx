import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import DataEntry from "./components/DataEntry";
import DataProcessing from "./components/DataProcessing";
import CustomerInteraction from "./components/CustomerInteraction";
import "./App.css";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    
      <div className="d-flex">
        <Sidebar />
        <div className="main-content p-4">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/data-entry" element={<DataEntry />} />
            <Route path="/data-processing" element={<DataProcessing />} />
            <Route path="/customer-interaction" element={<CustomerInteraction />} />
          </Routes>
        </div>
       </div>
    
  );
}

export default App;
