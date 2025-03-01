require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
mongoose.connect("mongodb+srv://sainath43:sai9391@cluster0.zdvp1.mongodb.net/cartDB?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("✅ DB Connected..."))
    .catch((err) => console.error("❌ DB Connection Error:", err));

// Cart Schema
const CartSchema = new mongoose.Schema({
  userId: String,
  items: [
    {
      name: String,
      price: Number,
      quantity: Number,
      img: String,
    },
  ],
  totalPrice: Number,
});

const Cart = mongoose.model("Cart", CartSchema);

// Add Item to Cart
app.post("/cart", async (req, res) => {
  const { userId, items, totalPrice } = req.body;
  let cart = await Cart.findOne({ userId });

  if (!cart) {
    cart = new Cart({ userId, items, totalPrice });
  } else {
    cart.items = items;
    cart.totalPrice = totalPrice;
  }

  await cart.save();
  res.json({ message: "Cart updated successfully", cart });
});

// Get Cart Data
app.get("/cart/:userId", async (req, res) => {
  const cart = await Cart.findOne({ userId: req.params.userId });
  res.json(cart || { items: [], totalPrice: 0 });
});

// Remove Item from Cart
app.delete("/cart/:userId/:itemId", async (req, res) => {
  let cart = await Cart.findOne({ userId: req.params.userId });

  if (cart) {
    cart.items = cart.items.filter((item) => item._id.toString() !== req.params.itemId);
    cart.totalPrice = cart.items.reduce((total, item) => total + item.price * item.quantity, 0);
    await cart.save();
  }

  res.json(cart || { items: [], totalPrice: 0 });
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
