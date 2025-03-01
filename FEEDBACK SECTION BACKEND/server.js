require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
// ✅ MongoDB Connection
mongoose.connect("mongodb+srv://sainath43:sai9391@cluster0.zdvp1.mongodb.net/newDelivery?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("✅ DB Connected..."))
    .catch((err) => console.error("❌ DB Connection Error:", err));

// Define Feedback Schema
const feedbackSchema = new mongoose.Schema({
  name: String,
  email: String,
  subject: String,
  rating: Number,
  message: String,
  date: { type: Date, default: Date.now },
});

const Feedback = mongoose.model("Feedback", feedbackSchema);

// Feedback Submission Endpoint
app.post("/submit-feedback", async (req, res) => {
  try {
    const { name, email, subject, rating, message } = req.body;

    if (!name || !email || !subject || !rating || !message) {
      return res.status(400).json({ error: "⚠️ All fields are required!" });
    }

    const feedback = new Feedback({ name, email, subject, rating, message });
    await feedback.save();

    res.status(201).json({ message: "✅ Feedback submitted successfully!" });
  } catch (err) {
    res.status(500).json({ error: "❌ Server Error. Please try again later." });
  }
});

// Start Server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
