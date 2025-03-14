const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true, unique: true},
  password: { type: String, required: true },
  cart: { type: Array, required: false },
});

module.exports = mongoose.model("user", userSchema);

