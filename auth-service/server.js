const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes")
const googleRoutes = require("./routes/googleRoutes")
const userRoutes = require("./routes/userRoutes")

dotenv.config()
const app = express()
const PORT = 3000
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(express.json())
app.use(cookieParser());

app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/google", googleRoutes)



app.listen(PORT, () => {
    console.log(`🔐 Auth service running on port ${PORT}`)
})

