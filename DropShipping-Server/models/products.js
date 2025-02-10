const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  image: { type: Array, required: false },
  size: { type: String, required: false },
  color: { type: String, required: false },
  description: { type: String, required: false },
  category: { type: String, required: true, unique: false },
});

module.exports = mongoose.model("product", productSchema);

// Every product will have name, price, color, description and ID of category from categories collection.
