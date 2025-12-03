import React, { useEffect, useState } from 'react'
import { socket } from '../../../utils/socket'

const MessagePanel = () => {
  const [messages, setMessages] = useState([])

  useEffect(()=> {
    console.log("working")
    socket.on("receive_message", (data) => {
      setMessages((prevMessages)=> [...prevMessages, data])
    })
    console.log("socket hit", socket)
    return () => socket.off("receive_message")
  }, [])
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