const express = require("express");
const multer = require("multer");
const cors = require("cors");
const mongoose = require("mongoose");
const fs = require("fs");
const pdfParse = require("pdf-parse");
const bodyParser = require('body-parser');


const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/enterprise_db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => console.log("Connected to MongoDB"));

// Define Schema
const fileSchema = new mongoose.Schema({
  fileName: String,
  extractedText: String,
});
const FileData = mongoose.model("FileData", fileSchema);

// Set up file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = "uploads/";
    if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => cb(null, file.originalname),
});
const upload = multer({ storage });

// Upload File API
app.post("/upload", upload.single("file"), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });

  res.json({ message: "File uploaded successfully", fileName: req.file.originalname });
});

// Extract Data API
app.post("/extract-data", async (req, res) => {
  try {
    const { fileName } = req.body;
    if (!fileName) return res.status(400).json({ error: "File name required" });

    const filePath = `uploads/${fileName}`;
    if (!fs.existsSync(filePath)) return res.status(404).json({ error: "File not found" });

    const dataBuffer = fs.readFileSync(filePath);
    const pdfData = await pdfParse(dataBuffer);

    // Save extracted data in MongoDB
    const newFileData = new FileData({ fileName, extractedText: pdfData.text });
    await newFileData.save();

    res.json({ extractedText: pdfData.text });
  } catch (error) {
    res.status(500).json({ error: "Failed to extract data" });
  }
});

// Dummy Chatbot API
app.post("/chatbot", (req, res) => {
  const { query } = req.body;

  // Dummy AI response
  const replies = {
    "hello": "Hi there! How can I assist you?",
    "how are you": "I'm just a bot, but I'm doing great!",
    "help": "Sure! What do you need help with?",
  };

  const reply = replies[query.toLowerCase()] || "I'm not sure about that. Can you rephrase?";
  res.json({ reply });
});

// Define schema for support tickets
const TicketSchema = new mongoose.Schema({
  subject: String,
  description: String,
  status: { type: String, default: "Open" },
  createdAt: { type: Date, default: Date.now },
});

const TicketModel = mongoose.model("Ticket", TicketSchema);

// Get all tickets
app.get("/tickets", async (req, res) => {
  const tickets = await TicketModel.find();
  res.json(tickets);
});

// Create new ticket
app.post("/tickets", async (req, res) => {
  const { subject, description } = req.body;
  const newTicket = new TicketModel({ subject, description });
  await newTicket.save();
  res.json({ message: "Ticket created successfully", ticket: newTicket });
});


// Chatbot Route
app.post("/chatbot", (req, res) => {
    const { query } = req.body;

    if (!query) {
        return res.status(400).json({ error: "Query is required" });
    }

    // Dummy chatbot response
    let reply = "I'm just a bot. How can I help you?";
    if (query.toLowerCase().includes("hello")) {
        reply = "Hello! How can I assist you today?";
    }

    res.json({ reply });
});



// Get All Extracted Data API
app.get("/get-data", async (req, res) => {
  try {
    const data = await FileData.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

// Start Server
// Start the server

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
