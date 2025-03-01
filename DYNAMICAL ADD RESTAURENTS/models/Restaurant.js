const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  name: String,
  address: String,
  website: String,
});

module.exports = mongoose.model("Restaurant", restaurantSchema);
