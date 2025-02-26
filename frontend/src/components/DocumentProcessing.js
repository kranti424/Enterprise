import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DocumentProcessing = () => {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    // Fetch documents from the backend when the component mounts
    const fetchDocuments = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/document-processing');
        setDocuments(response.data);
      } catch (error) {
        console.error('Error fetching documents:', error);
      }
    };

    fetchDocuments();
  }, []);

  return (
    <div>
      <h2>Document Processing</h2>
      {documents.length > 0 ? (
        <ul>
          {documents.map((doc, index) => (
            <li key={index}>{doc.name}</li>
          ))}
        </ul>
      ) : (
        <p>No documents available</p>
      )}
    </div>
  );
};

export default DocumentProcessing;
