const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const cookieParser = require("cookie-parser");

dotenv.config()
const authRoutes = require("./routes/authRoutes")
const googleRoutes = require("./routes/googleRoutes")
const app = express()
const PORT = 3000

app.get("/health", (req, res) => {
    res.json({ status: "Auth service is running" })
})
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
})); 
app.use(express.json())
app.use(cookieParser());

app.use("/api/auth", authRoutes)
app.use("/api/google", googleRoutes)



app.listen(PORT, () => {
    console.log(`🔐 Auth service running on port ${PORT}`)
})

