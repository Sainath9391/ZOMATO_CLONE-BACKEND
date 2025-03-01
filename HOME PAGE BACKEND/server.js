require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// 📌 Connect to MongoDB
mongoose.connect("mongodb+srv://sainath43:sai9391@cluster0.zdvp1.mongodb.net/foodDelivery?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("✅ DB Connected..."))
    .catch((err) => console.error("❌ DB Connection Error:", err));


// 📌 Define Schema
const restaurantSchema = new mongoose.Schema({
    name: String,
    cuisine: String,
    location: String,
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

// 📌 API Route: Search for Restaurants
app.get("/search", async (req, res) => {
    try {
        const query = req.query.q;
        if (!query) {
            return res.status(400).json({ message: "⚠️ Search query is required" });
        }

        // Search by name or cuisine
        const results = await Restaurant.find({
            $or: [
                { name: { $regex: query, $options: "i" } }, // Case-insensitive search
                { cuisine: { $regex: query, $options: "i" } }
            ]
        });

        if (results.length === 0) {
            return res.status(404).json({ message: "❌ No restaurants found" });
        }

        res.json(results);
    } catch (error) {
        res.status(500).json({ message: "❌ Internal Server Error", error });
    }
});

// 📌 Temporary API Route: Insert Sample Data
app.post("/insertSampleData", async (req, res) => {
    try {
        const sampleRestaurants = [
            { name: "Spicy Grill", cuisine: "Indian", location: "New York" },
            { name: "Sushi World", cuisine: "Japanese", location: "San Francisco" },
            { name: "Pasta Paradise", cuisine: "Italian", location: "Los Angeles" },
            { name: "Taco Fiesta", cuisine: "Mexican", location: "Houston" },
            { name: "Burger House", cuisine: "American", location: "Chicago" }
        ];

        await Restaurant.insertMany(sampleRestaurants);
        res.json({ message: "✅ Sample restaurants inserted successfully!" });
    } catch (error) {
        res.status(500).json({ message: "❌ Error inserting data", error });
    }
});

app.get("/restaurant/:name", async (req, res) => {
    try {
        const restaurantName = req.params.name.replace(/-/g, " "); // Convert URL format back to normal text
        const restaurant = await Restaurant.findOne({ name: new RegExp(`^${restaurantName}$`, "i") });

        if (!restaurant) {
            return res.status(404).send("Restaurant Not Found");
        }

        res.json(restaurant);
    } catch (error) {
        res.status(500).json({ message: "Error fetching restaurant details", error });
    }
});


// 📌 Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
