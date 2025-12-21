import React, { useEffect, useState } from 'react'
import { socket } from '../../../utils/socket'
import { useCurrentUser } from '../../hooks/useCurrentUser'
import { useGetMessagesQuery } from '../../features/api/messageApi'

const MessagePanel = ({ user }) => {
  const [messages, setMessages] = useState([])
  const currentUser = useCurrentUser()
  const userId = user?._id || user?.id

  const { data: existingMessages, isLoading } = useGetMessagesQuery(userId, {
    skip: !userId
  })

  useEffect(() => {
    if (existingMessages) {
      const normalizedMessages = existingMessages?.data?.map(msg => ({
        ...msg,
        id: msg._id || msg.id,
        senderId: msg.senderId || msg.sender_id,
        receiverId: msg.receiverId || msg.receiver_id
      }))
      setMessages(normalizedMessages)
    }
  }, [existingMessages])

  useEffect(() => {
    if (currentUser?.userData?.id) {
      console.log("🔌 MessagePanel: Joining socket room for user:", currentUser.userData.id);
      socket.emit('join', currentUser.userData.id);
    }

    socket.on("receive_message", (data) => {
      const normalizedMessage = {
        ...data,
        id: data._id || data.id,
        senderId: data.senderId || data.sender_id,
        receiverId: data.receiverId || data.receiver_id
      }
      setMessages((prevMessages) => [...prevMessages, normalizedMessage])
    })

    return () => socket.off("receive_message")
  }, [currentUser])

  if (isLoading) {
    return <div className="p-4">Loading messages...</div>
  }

  return (
    <div className="p-4 h-80">
      {messages?.length === 0 ? (
        <p className="text-gray-500 text-center">No messages yet. Start the conversation!</p>
      ) : (
        messages?.map((msg, index) => (
          <div key={msg.id || index} className={`mb-2 p-2 rounded text-white   ${msg?.senderId == currentUser?.userData?.id ? 'bg-blue-500 ml-auto max-w-xs' : 'bg-gray-300 mr-auto max-w-xs'
            }`}>
            <p>{msg.text}</p>
          </div>
        ))
      )}
    </div>
  )
}

export default MessagePanel