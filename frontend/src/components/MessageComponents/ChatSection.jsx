import React, { useState } from "react";
import { Icons } from "../../assets/Icons";
import { IMAGES } from "../../assets/Images";
import { useGetAllUsersQuery } from "../../features/api/userApi";

const ChatSection = ({ onUserSelect, selectedUserId }) => {
    const [search, setSearch] = useState("");

    const { data: usersData } = useGetAllUsersQuery()

    const filteredUsers = usersData.getUsers.filter(user => user?.name?.toLowerCase().includes(search?.toLowerCase()))
    return (
        <div className="h-full p-3 text-black flex flex-col">

            {/* Header */}
            <h1 className="font-semibold text-xl mb-3">Chats</h1>

            {/* Search Bar */}
            <div className="relative mb-4">
                <input
                    type="text"
                    value={search}
                    onChange={(e)=> setSearch(e.target.value)}
                    placeholder="Search or start a new chat"
                    className="w-full px-4 py-2 pl-10 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none"
                />
                <Icons.Search
                    size={18}
                    className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-500"
                />
            </div>

            {/* Chat List */}
            <div className="space-y-3 flex-1 overflow-y-auto">
                {filteredUsers.map((chat) => (
                    <div
                        key={chat.id}
                        onClick={() => onUserSelect(chat)}
                        className={`flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg cursor-pointer transition ${
                            selectedUserId === chat.id ? 'bg-blue-50 border border-blue-200' : ''
                        }`}
                    >
                        <img
                            src={chat.profileImg ?? IMAGES.PERSONPLACEHOLDER}
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
