// Define your backend API base URL here
export const API_BASE_URL = 'http://localhost:5000'; // Replace with your actual backend URL

// Define other constants you may need across the app
export const EMAIL_API = `${API_BASE_URL}/send_email`;
export const TICKET_API = `${API_BASE_URL}/create_ticket`;

// Any other constants
export const CHATBOT_URL = `${API_BASE_URL}/chatbot`; // If integrating an AI chatbot
