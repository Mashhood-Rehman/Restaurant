import React, { useState } from "react";
import { Icons } from "../../assets/Icons";
import { socket } from "../../../utils/socket";
import { useSendMessagesMutation } from "../../features/api/messageApi";

const MessageFooter = ({user}) => {
    const [message, setMessage] = useState("");
    const [sendMessages] = useSendMessagesMutation()
    const sendMessage = async () => {
        if(!message.trim() )return;
      const messageSent =  socket.emit("send_message", {
            to: user._id,
            text: message
        })
        if(messageSent){
          await   sendMessages({
            receiverId: user._id,
            text: message
          })

            console.log("Message sent via socket:", message);
        } else {
            console.log("Failed to send message via socket");
        }
        setMessage("")
    }

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
