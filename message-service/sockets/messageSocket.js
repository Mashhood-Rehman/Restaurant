const setupMessageSocket = (io) => {
    try {
        io.connection((socket) => {

            socket.on("join", (userId)=> {
                socket.join(userId)
                console.log("User joined room: " + userId);
            })
        })

        socket.on("send_message", (message) => {
            io.to(message.receiverId).emit("receive_message", message)
        })
    } catch (error) {
        
    }
}
module.exports = setupMessageSocket;