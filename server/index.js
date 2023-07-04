const express = require("express");
const Stripe = require("stripe"); //configure the stripe api key
const cors = require("cors"); //communication between frontend and backend
const config = require("dotenv").config();

const app = express();
console.log(process.env.REACT_APP_PORT);
const PORT = process.env.REACT_APP_PORT || 4100;

const stripe = new Stripe(
  "sk_test_51LCGi3AFlpcHrxjJz1hK5BfuMXM7Hb09zGelXXYZpWYGV4mpSS9uAOiDNdsKAktOTQ6wGlepvk6dDUkiFKm0cPte00NUIuv8sv"
);

app.use(cors({ origin: "https://stripe-store-6kdg.onrender.com/ " })); //configure the cors
app.use(express.json());

app.post("/api/checkout", async (req, res) => {
  // you can get more data to find in a database, and so on
  const { id, amount } = req.body;

  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "USD",
      description: "Gaming Keyboard",
      payment_method: id,
      confirm: true, //confirm the payment at the same time
    });

    return res.json({ message: "Successful Payment" });
  } catch (error) {
    return res.json({ message: error.raw.message });
  }
});

app.listen(process.env.PORT, () => {
  console.log("server is running ", PORT);
});
