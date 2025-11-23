const express = require("express")
const dotenv = require("dotenv")
const db = require("./db/db")
const http = require("http")
const messageRoutes = require("./route/messageRoute")
const { Server } = require("socket.io")
const setupMessageSocket = require("./sockets/messageSocket")
dotenv.config()
const app = express()
app.use(express.json())
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use("/api/messages", messageRoutes)
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*"
    },
})
setupMessageSocket(io)

app.listen(PORT, () => {
    db()
    console.log(`Message Service is running on port ${PORT}`)
})