const express = require("express")
const dotenv = require("dotenv")
const db = require("./db/db")
const http = require("http")
const messageRoutes = require("./route/messageRoute")
const { Server } = require("socket.io")
const cors = require("cors")
const setupMessageSocket = require("./sockets/messageSocket")
dotenv.config()
const app = express()
app.use(express.json())
const PORT = process.env.PORT || 3003
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(express.json())
app.use("/api/messages", messageRoutes)
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
         origin: "http://localhost:5173",
        credentials: true,
    },
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