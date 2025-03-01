const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
    name: String,
    email: String,
    subject: String,
    rating: Number,
    message: String,
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Feedback", feedbackSchema);
