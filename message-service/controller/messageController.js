const message = require("../model/message");

const sendMessage = async (req, res) => {
  try {
    const { receiverId, text } = req.body;
    const senderId = req.user.id;

    // Validate that we have either text or file
    if (!text && !req.file) {
      return res.status(400).json({ message: "Message must contain text or file" });
    }

    if (!receiverId) {
      return res.status(400).json({ message: "Receiver ID is required" });
    }

    // Handle file upload if present
    let fileData = {};
    if (req.file) {
      fileData = {
        fileUrl: req.file.path, // Cloudinary URL
        fileType: req.file.mimetype,
        fileName: req.file.originalname,
      };
    }

    const newMessage = new message({
      senderId,
      receiverId,
      text: text || null, // Allow null if only file is sent
      ...fileData,
      isRead: false,
    });

    await newMessage.save(); // Add await here!
    console.log("✅ Message saved:", newMessage);
    
    return res.status(201).json({ 
      message: "Message Sent Successfully", 
      data: newMessage 
    });
  } catch (error) {
    console.error("❌ Error in sendMessage:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
}

// Get full conversation

const getConversation = async (req, res) => {
  try {
    const { userId } = req.params
    const currentUserId = req.user.id;
    const messages = await message.find({
      $or: [
        { senderId: currentUserId, receiverId: userId },
        { senderId: userId, receiverId: currentUserId }
      ],

    }).sort({ createdAt: 1 });
    return res.status(200).json({ message: "Conversation fetched successfully", data: messages });

  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}


// Conversation list (recent chats)
const getChatList = async (req, res) => {
  try {
    const messages = await message.aggregate([
      {
        $match: {
          $or: [
            { senderId: req.user.id },
            { receiverId: req.user.id }
          ]
        }
      },
      {
        $sort: { createdAt: -1 }
      },
      {
        $group: {
          _id: {
            user: {
              $cond: [
                { $eq: ["$senderId", req.user.id] },
                "$receiverId",
                "$senderId"
              ]
            }
          },
          lastMessage: { $first: "$$ROOT" }
        }
      }
    ]);

    res.json(messages);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = { sendMessage, getConversation, getChatList };