const express = require("express");
const Restaurant = require("../models/Restaurant");

const router = express.Router();

// Add a new restaurant
router.post("/add", async (req, res) => {
    try {
        const { name, address, website } = req.body;
        const newRestaurant = new Restaurant({ name, address, website });
        await newRestaurant.save();
        res.status(201).json({ message: "Restaurant added successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error adding restaurant" });
    }
});

// Get all restaurants
router.get("/", async (req, res) => {
    try {
        const restaurants = await Restaurant.find();
        res.json(restaurants);
    } catch (error) {
        res.status(500).json({ error: "Error fetching restaurants" });
    }
});

module.exports = router;
