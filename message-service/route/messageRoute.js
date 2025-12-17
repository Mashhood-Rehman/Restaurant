const express = require('express');
const {protect} = require("shared")
 const { sendMessage, getConversation, getChatList } = require('../controller/messageController');
const router = express.Router()

router.post("/send-message", protect(), sendMessage);
router.get("/get-conversation/:userId", protect(), getConversation);
router.get("/get-list", protect(), getChatList);

module.exports = router;