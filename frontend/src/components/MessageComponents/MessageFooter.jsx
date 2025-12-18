import React, { useState, useEffect } from "react";
import { Icons } from "../../assets/Icons";
import { socket } from "../../../utils/socket";
import { useSendMessagesMutation } from "../../features/api/messageApi";
import { useCurrentUser } from "../../hooks/useCurrentUser";

const MessageFooter = ({user}) => {
    const [message, setMessage] = useState("");
    const [sendMessages] = useSendMessagesMutation();
    const currentUser = useCurrentUser();

    console.log("current user",currentUser)

    // Join socket room when component mounts
    useEffect(() => {
        if (currentUser?.userData?.id) {
            console.log("🔌 Joining socket room for user:", currentUser.userData.id);
            socket.emit('join', currentUser.userData.id);
        }
    }, [currentUser]);
const sendMessage = async () => {
  if (!message.trim()) return;
console.log("current user",currentUser)
console.log("user",user)
  try {
    // Get current user ID from RTK Query cache
    const senderId = currentUser?.userData?.id;
    const receiverId = user?.id;

    if (!senderId || !receiverId) {
      console.error("❌ Missing senderId or receiverId:", { senderId, receiverId });
      return;
    }

    const payload = {
      senderId,
      receiverId,
      text: message,
    };

    console.log("📤 Sending message payload:", payload);

    // Emit to socket with acknowledgement callback
    socket.emit("send_message", payload, (ack) => {
      if (ack && ack.success) {
        console.log("✅ Message sent via socket:", message);
      } else {
        console.error("❌ Failed to send via socket:", ack?.error);
        // Fallback: also try HTTP API
        sendMessages({
          receiverId,
          text: message,
        }).then(() => {
          console.log("✅ Message sent via HTTP API");
        }).catch(err => {
          console.error("❌ Failed to send via HTTP:", err);
        });
      }
    });

    setMessage("");
  } catch (error) {
    console.error("❌ Error in sendMessage:", error);
  }
};

    const changeHandler = (e) =>{
        const {name, value} = e.target;
        setMessage(value)
    }
    return (
        <div className="border-t border-gray-200 px-4 py-3 flex items-center gap-3 bg-white">

            {/* Emoji Button */}
            <button className="text-gray-600 hover:text-gray-800 transition">
                <Icons.Annoyed size={22} />
            </button>

            {/* Attachment */}
            <button className="text-gray-600 hover:text-gray-800 transition">
                <Icons.Folder size={22} />
            </button>

            {/* Input */}
            <input
                type="text"
                placeholder="Type a message"
                value={message}
                onChange={changeHandler}
                className="flex-1 px-4 py-2 bg-gray-100 rounded-full focus:outline-none"
            />

            {/* Send */}
            <button onClick={sendMessage} className="text-gray-600 hover:text-gray-800 transition">
                <Icons.Send size={22} />
            </button>
        </div>
    );
};

export default MessageFooter;
