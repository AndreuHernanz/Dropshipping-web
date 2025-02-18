const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  image: { type: Array, required: true },
  stock: { type: Number, required: true },
  size: { type: Array, required: false },
  color: { type: Array, required: false },
  description: { type: String, required: false },
  category: { type: String, required: true, unique: false },
  price_id: { type: String, required: false },
});

module.exports = mongoose.model("product", productSchema);

