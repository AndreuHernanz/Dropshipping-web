const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
require("dotenv").config();
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

dotenv.config();
const app = express();
const port = process.env.PORT || 4040;

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Connect to MongoDB
async function connectToDB() {
  try {
    await mongoose.connect(process.env.MONGO, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("Connected to the DB :white_check_mark:");
  } catch (error) {
    console.error("ERROR: Your DB is not running, start it up :radioactive_sign:");
  }
}
connectToDB();

// Routes
app.use("/category", require("./routes/categoryRoutes.js"));
app.use("/product", require("./routes/productsRoutes.js"));
app.use("/user", require("./routes/usersRoutes.js"));

// Stripe Checkout Route
app.post("/create-checkout-session", async (req, res) => {
  const { items } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      // line_items: [
      //   {
      //     price: "price_1QtX2IEgDHE5Jv01bOOoipjf", // Replace with actual Price ID from Stripe Dashboard
      //     quantity: 1,
      //   },
      // ],
      line_items: items,
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/checkout-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/checkout-cancelled`,
    });

    res.json({ url: session.url }); // Send session URL to frontend
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start Server
app.listen(port, () => console.log(`:rocket: Listening on port: ${port} :rocket:`));