const dotenv = require("dotenv");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

class CheckoutController {

	async doCheckout (req,res){
	    const { items } = req.body;
		console.log(items);
	
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
	}
}

module.exports = new CheckoutController()