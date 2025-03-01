require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const restaurantRoutes = require("./routes/restaurantRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON requests

// MongoDB Connection
mongoose.connect("mongodb+srv://sainath43:sai9391@cluster0.zdvp1.mongodb.net/AddRestaurantsDB?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("✅ DB Connected..."))
    .catch((err) => console.error("❌ DB Connection Error:", err));

app.use("/api/restaurants", restaurantRoutes);

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
