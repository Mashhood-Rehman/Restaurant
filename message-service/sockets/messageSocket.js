const Message = require("../model/message");

const setupMessageSocket = (io) => {
  try {
    io.on("connection", (socket) => {
      console.log("Socket connected:", socket.id);

      socket.on("join", (userId) => {
        if (userId) {
          socket.join(userId);
          console.log("User joined room:", userId);
        }
      });

      socket.on("send_message", async (message, ack) => {
        try {
          const senderId = message.senderId || message.from || message.sender;
          const receiverId = message.receiverId || message.to;

          if (!senderId || !receiverId || !message.text) {
            const error = "Missing senderId, receiverId or text";
            if (typeof ack === "function") ack({ success: false, error });
            return;
          }

          const newMessage = new Message({
            senderId,
            receiverId,
            text: message.text,
            isRead: false
          });

          await newMessage.save();

          // emit the saved message to the receiver's room (or socket)
          io.to(receiverId).emit("receive_message", newMessage);

          if (typeof ack === "function") ack({ success: true, data: newMessage });
        } catch (err) {
          console.error("Error saving message in socket:", err);
          if (typeof ack === "function") ack({ success: false, error: err.message });
        }
      });
    });
  } catch (error) {
    console.error("Socket setup error:", error);
  }
};

module.exports = setupMessageSocket;