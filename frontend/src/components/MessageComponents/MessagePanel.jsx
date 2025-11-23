import React, { useEffect, useState } from 'react'
import { socket } from '../../../utils/socket'

const MessagePanel = () => {
  const [messages, setMessages] = useState([])

  useEffect(()=> {
    socket.on("receive_message", (data) => {
      setMessages((prevMessages)=> [...prevMessages, data])
    })
    return () => socket.off("receive_message")
  }, [])
  return (
    <div>
      {
        messages?.map((msg, index) => (
                  <p key={index}>{msg.text}</p>

        ))
      }
    </div>
  )
}

export default MessagePanel