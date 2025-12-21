const express = require('express');
const {protect, upload} = require("shared")
 const { sendMessage, getConversation, getChatList } = require('../controller/messageController');
const router = express.Router()

const chatUpload = upload("chatFiles");
const uploadFile = chatUpload.single("file");

router.post("/send-message", protect(),uploadFile, sendMessage);
router.get("/get-conversation/:userId", protect(), getConversation);
router.get("/get-list", protect(), getChatList);

module.exports = router;