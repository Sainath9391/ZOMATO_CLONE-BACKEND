const express = require("express");
const Offer = require("../models/Offer"); // Import Offer model

const router = express.Router();

// ✅ Apply Offer API
router.post("/apply-offer", async (req, res) => {
    const { offerName, discount } = req.body;

    if (!offerName || discount < 0) {
        return res.status(400).json({ success: false, message: "Invalid offer data" });
    }

    try {
        const newOffer = new Offer({ offerName, discount });
        await newOffer.save();

        res.json({ success: true, message: `Offer '${offerName}' applied successfully!` });
    } catch (error) {
        console.error("Error saving offer:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

// ✅ Retrieve All Offers API
router.get("/offers", async (req, res) => {
    try {
        const offers = await Offer.find();
        res.json({ success: true, offers });
    } catch (error) {
        console.error("Error fetching offers:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

module.exports = router; // Export the router
