const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const orderRoutes = require("./routes/orderRoute");
const { connectRabbitMQ } = require("./broker/rabbit");

dotenv.config();
const port = process.env.PORT || 3001;

const app = express();

// middleware
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:8000"],
    credentials: true,
}));

app.use("/api/orders", orderRoutes);

// IMPORTANT: do NOT call `app()` yourself
(async () => {
    await connectRabbitMQ();

    app.listen(port, () => {
        console.log(`Orders service is running on port ${port}`);
    });
})();
