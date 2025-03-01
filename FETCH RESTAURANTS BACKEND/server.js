require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// ✅ Route to Get Nearby Restaurants (Using OpenStreetMap & Overpass API)
app.post("/api/restaurants", async (req, res) => {
    const { latitude, longitude } = req.body;

    if (!latitude || !longitude) {
        return res.status(400).json({ error: "Latitude and Longitude are required!" });
    }

    try {
        // Overpass API Query to Get Restaurants Near Given Location
        const overpassUrl = `https://overpass-api.de/api/interpreter?data=[out:json];node(around:5000,${latitude},${longitude})["amenity"="restaurant"];out;`;
        
        const response = await axios.get(overpassUrl);

        if (!response.data.elements.length) {
            return res.json({ message: "No restaurants found nearby!" });
        }

        // Format restaurant data
        const restaurants = response.data.elements.map((place) => ({
            name: place.tags.name || "Unnamed Restaurant",
            latitude: place.lat,
            longitude: place.lon,
        }));

        res.json({ restaurants });
    } catch (error) {
        console.error("Error fetching restaurants:", error);
        res.status(500).json({ error: "Internal server error!" });
    }
});

// ✅ Start Server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
