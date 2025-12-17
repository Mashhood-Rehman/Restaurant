import React, { useEffect, useState } from 'react'
import { socket } from '../../../utils/socket'
import { useCurrentUser } from '../../hooks/useCurrentUser'

const MessagePanel = () => {
  const [messages, setMessages] = useState([])
  const currentUser = useCurrentUser()

  useEffect(()=> {
    console.log("working")

    // Join socket room for current user
    if (currentUser?.userData?._id) {
      console.log("🔌 MessagePanel: Joining socket room for user:", currentUser.userData._id);
      socket.emit('join', currentUser.userData._id);
    }

    socket.on("receive_message", (data) => {
      console.log("📨 Received message:", data);
      setMessages((prevMessages)=> [...prevMessages, data])
    })
    console.log("socket hit", socket)
    return () => socket.off("receive_message")
  }, [currentUser])
  return (
    <div>
      {
        messages?.map((msg, index) => (
                  <p key={index}>{msg}</p>

        ))
      }
    </div>
  )
}

export default MessagePanel