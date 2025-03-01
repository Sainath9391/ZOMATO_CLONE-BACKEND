const express = require("express");
const Feedback = require("../models/feedback"); // Make sure this model exists
const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const { name, email, subject, rating, message } = req.body;
        if (!name || !email || !subject || !rating || !message) {
            return res.status(400).json({ error: "❌ All fields are required!" });
        }

        const feedback = new Feedback({ name, email, subject, rating, message });
        await feedback.save();

        res.status(201).json({ message: "✅ Feedback submitted successfully!" });
    } catch (err) {
        console.error("Feedback Error:", err);
        res.status(500).json({ error: "❌ Internal Server Error!" });
    }
});

module.exports = router;
