const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const bcrypt = require("bcryptjs");

// ✅ Import Mongoose Models
const User = require("./models/User"); // Fix: Correct model import


const SECRET_KEY = "your_secret_key"; // Replace with a strong secret key

// ✅ Initialize `app`
const app = express();
const PORT = 3000;

// ✅ Middleware
app.use(cors());
app.use(express.json());


// ✅ Signup Route
app.post("/signup", async (req, res) => {
    try {
        const { full_name, email_address, password } = req.body;

        if (!full_name || !email_address || !password) {
            return res.status(400).json({ error: "❌ All fields are required!" });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email_address });
        if (existingUser) {
            return res.status(400).json({ error: "❌ User already exists!" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save user
        const newUser = new User({ full_name, email_address, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: "✅ User Signed Up Successfully!" });
    } catch (err) {
        console.error("Signup Error:", err);
        res.status(500).json({ error: "❌ Internal server error!" });
    }
});

// ✅ Login Route with JWT Token
app.post("/login", async (req, res) => {
    try {
        const { email_address, password } = req.body;
        
        if (!email_address || !password) {
            return res.status(400).json({ message: "❌ Email and Password are required!" });
        }

        const user = await User.findOne({ email_address });
        if (!user) {
            return res.status(401).json({ message: "❌ Invalid credentials!" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "❌ Invalid credentials!" });
        }

        // ✅ Generate JWT Token
        const token = jwt.sign({ id: user._id, email: user.email_address }, SECRET_KEY, { expiresIn: "1h" });

        res.status(200).json({ message: "✅ Login successful!", token });
    } catch (err) {
        console.error("Login Error:", err);
        res.status(500).json({ message: "❌ Internal Server Error!" });
    }
});

// ✅ MongoDB Connection
mongoose.connect("mongodb+srv://sainath43:sai9391@cluster0.zdvp1.mongodb.net/newDelivery?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("✅ DB Connected..."))
    .catch((err) => console.error("❌ DB Connection Error:", err));

// ✅ Start Server
app.listen(PORT, () => console.log(`🚀 Server is running on port: ${PORT}`));
