const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  image: { type: Array, required: false },
  stock: { type: Number, required: true },
  size: { type: Array, required: false },
  color: { type: Array, required: false },
  description: { type: String, required: false },
  category: { type: String, required: true, unique: false },
});

module.exports = mongoose.model("product", productSchema);

