const express = require("express")
const dotenv = require("dotenv")
const db = require("./db/db")
const http = require("http")
const messageRoutes = require("./route/messageRoute")
const { Server } = require("socket.io")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const setupMessageSocket = require("./sockets/messageSocket")

dotenv.config()
const app = express()
app.use(express.json())
const PORT = process.env.PORT || 3003

const corsOptions = {
    origin: ["http://localhost:5173", "http://localhost:8000"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
}

app.use(cors(corsOptions));
app.use(cookieParser())
app.use("/api/messages", messageRoutes)

const server = http.createServer(app);
const io = new Server(server, {
    cors: corsOptions,
})
setupMessageSocket(io);

// Start server with proper async initialization
(async () => {
    try {
        await db();
        console.log("✅ Database connected");
        server.listen(PORT, () => {
            console.log(`🚀 Message Service running on port ${PORT}`);
        });
    } catch (error) {
        console.error("❌ Failed to start server:", error.message);
        process.exit(1);
    }
})();