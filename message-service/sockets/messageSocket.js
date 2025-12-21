const Message = require("../model/message");

const setupMessageSocket = (io) => {
  try {
    io.on("connection", (socket) => {
      console.log("✅ Socket connected:", socket.id);

      // Join room by userId
      socket.on("join", (userId) => {
        if (userId) {
          socket.join(String(userId));
          console.log(`👤 User ${userId} joined room`);
        }
      });

      // Handle incoming message
      socket.on("send_message", async (message, ack) => {
        try {
          // Normalize field names (support both 'to' and 'receiverId')
          const senderId = message.senderId || message.from || message.sender;
          const receiverId = message.receiverId || message.to;
          const text = message.text;
          const fileUrl = message.fileUrl;
          const fileType = message.fileType;
          const fileName = message.fileName;

          // Allow messages with either text or file
          if (!senderId || !receiverId || (!text && !fileUrl)) {
            const error = "Missing senderId, receiverId, or content (text or file)";
            console.error("❌", error, { senderId, receiverId, text, fileUrl });
            if (typeof ack === "function") ack({ success: false, error });
            return;
          }

          // Save message to MongoDB
          const newMessage = new Message({
            senderId: String(senderId),
            receiverId: String(receiverId),
            text: text || null,
            fileUrl: fileUrl || null,
            fileType: fileType || null,
            fileName: fileName || null,
            isRead: false,
          });

          await newMessage.save();

          // Emit to receiver's room
          io.to(String(receiverId)).emit("receive_message", newMessage);

          // Also emit back to the sender so their UI updates immediately
          socket.emit("receive_message", newMessage);

          // Send acknowledgement to sender
          if (typeof ack === "function") {
            ack({ success: true, data: newMessage });
          }
        } catch (error) {
          console.error("❌ Error saving message:", error.message);
          if (typeof ack === "function") {
            ack({ success: false, error: error.message });
          }
        }
      });

      socket.on("disconnect", () => {
        console.log("❌ Socket disconnected:", socket.id);
      });
    });
  } catch (error) {
    console.error("❌ Socket setup error:", error.message);
  }
};

module.exports = setupMessageSocket;