const Stripe = require('stripe');
require('dotenv').config({path:'./.env'})

const stripe = new Stripe(process.env.KEY);




const createSession = async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: req.body,
      mode: "payment",
      success_url: "http://localhost:3001/payment/success",
      cancel_url: "http://localhost:3001/payment/failure",
    });

    return res.json({ url: session.url });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


module.exports = createSession