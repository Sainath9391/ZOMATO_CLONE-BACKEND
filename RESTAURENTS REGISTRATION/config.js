const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://sainath43:sai9391@cluster0.zdvp1.mongodb.net/AddRestaurantsDB?retryWrites=true&w=majority&appName=Cluster0");
        console.log("✅ MongoDB Connected");
    } catch (err) {
        console.error("❌ MongoDB Connection Error:", err);
        process.exit(1);
    }
};

module.exports = connectDB;


