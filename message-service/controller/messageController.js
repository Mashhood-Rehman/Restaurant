const  message = require("../model/message");

const sendMessage = (req, res) => {
    try{
        const {receiverId, text} = req.body;
        const senderId = req.user.id; 
        const newMessage = new message({
            senderId,
            receiverId,
            text
        });
        newMessage.save();
        return res.status(201).json({message: "Message Sent Successfully", data: newMessage});
    } catch (error) {
        res.status(500).json({message: "Internal Server Error"});
    }
}

// Get full conversation

const getConversation = async (req, res) => {
    try {
        const {userId} = req.params
        const currentUserId = req.user.id; 
        const messages = await message.find({
            $or: [
                {sendId: currentUserId, receiverId: userId },
                {sendId: userId, receiverId: currentUserId}
            ],

        }).sort({createdAt: 1});
        return res.status(200).json({message: "Conversation fetched successfully", data: messages});

    }catch (error) {
        res.status(500).json({message: "Internal Server Error"});
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


module.exports = {sendMessage, getConversation, getChatList};