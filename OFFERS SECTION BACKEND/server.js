const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const offerRoutes = require("./routes/offers");

// ✅ Initialize `app`
const app = express();
const PORT = 3000;

// ✅ Middleware
app.use(cors());
app.use(express.json());

app.use("/api/offers", offerRoutes);


// ✅ MongoDB Connection
mongoose.connect("mongodb+srv://sainath43:sai9391@cluster0.zdvp1.mongodb.net/newDelivery?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("✅ DB Connected..."))
    .catch((err) => console.error("❌ DB Connection Error:", err));

// ✅ Start Server
app.listen(PORT, () => console.log(`🚀 Server is running on port: ${PORT}`));