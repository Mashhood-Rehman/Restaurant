require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());
app.use("/images", express.static(path.join(__dirname, "../frontend/src/Images")));

// Routes
const productRouter = require("./routes/productroute");
const userRouter = require("./routes/userRoute");
const orderRouter = require("./routes/orderRoute");

app.use("/", userRouter);
app.use("/", productRouter);
app.use("/", orderRouter);

// ✅ Stripe checkout endpoint
app.post("/create-checkout-sessions", async (req, res) => {
  try {
    const { products } = req.body;

    const lineItems = products.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
        },
        unit_amount: Math.round(item.price * 100), // cents
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: "http://localhost:5173/success",
      cancel_url: "http://localhost:5173/cancel",
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ message: error.message });
  }
});

// Connect MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
