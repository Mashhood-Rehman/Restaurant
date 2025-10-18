const express = require("express")
const dotenv = require("dotenv")
const orderRoutes = require("./routes/orderRoute")
dotenv.config()
const port = process.env.PORT
const app = express()
app.use(express.json())
app.use("/api/orders", orderRoutes)

app.listen(port, () => {
    console.log(`Orders service is running on port ${port}`);
})