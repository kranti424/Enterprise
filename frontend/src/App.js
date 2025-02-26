import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DataEntry from './components/DataEntry';
import DocumentProcessing from './components/DocumentProcessing';
import Sidebar from './components/Sidebar';

const App = () => {
  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div style={{ marginLeft: 240, padding: 20 }}>
          <Routes>
            <Route path="/data-entry" element={<DataEntry />} />
            <Route path="/document-processing" element={<DocumentProcessing />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
