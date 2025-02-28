import React from "react";
import { Card, Button } from "react-bootstrap";

const OCR = () => {
  return (
    <div>
      <h2>OCR (Optical Character Recognition)</h2>
      <Card className="shadow-sm p-4 mt-3">
        <Card.Body>
          <p>Upload an image, and our system will extract text from it.</p>
          <input type="file" className="form-control mb-3" />
          <Button variant="primary">Upload</Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default OCR;
