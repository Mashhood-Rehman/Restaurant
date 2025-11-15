import React from "react";
import { Icons } from "../../assets/Icons";

const MessageFooter = () => {
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
                className="flex-1 px-4 py-2 bg-gray-100 rounded-full focus:outline-none"
            />

            {/* Send */}
            <button className="text-gray-600 hover:text-gray-800 transition">
                <Icons.Send size={22} />
            </button>
        </div>
    );
};

export default MessageFooter;
