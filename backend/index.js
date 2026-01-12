require("dotenv").config();
const path = require("path");

// Load shared package env vars
require("dotenv").config({ path: path.join(__dirname, "../shared/.env") });

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:8000"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
}));
// Routes
const productRouter = require("./routes/productroute");
const userRouter = require("./routes/userRoute");
const orderRouter = require("./routes/orderRoute");

app.use("/", userRouter);
app.use("/api/products", productRouter);
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
