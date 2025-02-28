import React, { useState } from "react";
import { Card, Button, Form } from "react-bootstrap";
import { FiUploadCloud } from "react-icons/fi";

const DataEntry = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (!selectedFile) {
      alert("Please select a file to upload.");
      return;
    }
    alert(`Uploading: ${selectedFile.name}`);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>📂 Data Entry & File Upload</h2>

      <Card style={{ padding: "20px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)", textAlign: "center" }}>
        <Card.Body>
          <h5>Upload Files</h5>
          <p style={{ color: "#6c757d" }}>Upload PDFs or other documents for processing.</p>

          {/* File Input */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              border: "2px dashed #007bff",
              padding: "20px",
              borderRadius: "10px",
              cursor: "pointer",
              transition: "0.3s",
              background: "rgba(255, 255, 255, 0.8)",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(0, 123, 255, 0.1)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255, 255, 255, 0.8)")}
          >
            <FiUploadCloud size={50} color="#007bff" />
            <Form.Group controlId="fileUpload" style={{ marginTop: "10px" }}>
              <Form.Label
                style={{
                  display: "inline-block",
                  padding: "8px 15px",
                  background: "#007bff",
                  color: "white",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Choose File
                <Form.Control type="file" hidden onChange={handleFileChange} />
              </Form.Label>
            </Form.Group>
            {selectedFile && <p style={{ marginTop: "10px", color: "#333" }}>{selectedFile.name}</p>}
          </div>

          {/* Upload Button */}
          <Button style={{ marginTop: "15px", background: "#007bff", border: "none" }} onClick={handleUpload}>
            Upload File
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default DataEntry;
