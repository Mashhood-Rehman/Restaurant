import React from "react";
import { Icons } from "../../assets/Icons";
import { IMAGES } from "../../assets/Images";

const ChatSection = () => {
    const chats = [
        {
            id: 1,
            name: "Home",
            lastMessage: "Image",
            time: "6:25 AM",
            image: IMAGES.PERSONPLACEHOLDER,
        },
        {
            id: 2,
            name: "Api",
            lastMessage: "Kahan reh gaye ho?",
            time: "5:28 AM",
            image: IMAGES.PERSONPLACEHOLDER,
        },
        {
            id: 3,
            name: "والد",
            lastMessage: "Missed voice call",
            time: "5:14 AM",
            image: IMAGES.PERSONPLACEHOLDER,
        },
        {
            id: 4,
            name: "Zaid",
            lastMessage: "👆",
            time: "4:37 AM",
            image: IMAGES.PERSONPLACEHOLDER,
        },
        {
            id: 5,
            name: "Hamdan Khan",
            lastMessage: "6 bajay aj",
            time: "2:03 AM",
            image: IMAGES.PERSONPLACEHOLDER,
        },
        {
            id: 6,
            name: "talha new",
            lastMessage: "😂😂",
            time: "Yesterday",
            image: IMAGES.PERSONPLACEHOLDER,
        },
        {
            id: 7,
            name: "Hasnain",
            lastMessage: "🎤 0:22",
            time: "Yesterday",
            image: IMAGES.PERSONPLACEHOLDER,
        },
    ];

    return (
        <div className="bg-white p-3 text-black ">

            {/* Header */}
            <h1 className="font-semibold text-xl mb-3">Chats</h1>

            {/* Search Bar */}
            <div className="relative mb-4">
                <input
                    type="text"
                    placeholder="Search or start a new chat"
                    className="w-full px-4 py-2 pl-10 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none"
                />
                <Icons.Search
                    size={18}
                    className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-500"
                />
            </div>

            {/* Chat List */}
            <div className="space-y-3">
                {chats.map((chat) => (
                    <div
                        key={chat.id}
                        className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg cursor-pointer transition"
                    >
                        <img
                            src={chat.image}
                            alt={chat.name}
                            className="w-12 h-12 rounded-full object-cover"
                        />

                        <div className="flex-1">
                            <div className="flex justify-between items-center">
                                <h2 className="font-medium">{chat.name}</h2>
                                <span className="text-xs text-gray-500">
                                    {chat.time}
                                </span>
                            </div>
                            <p className="text-sm text-gray-600 truncate">
                                {chat.lastMessage}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default ChatSection;
