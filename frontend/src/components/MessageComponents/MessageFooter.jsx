import React, { useState, useEffect, useRef } from "react";
import { Icons } from "../../assets/Icons";
import { socket } from "../../../utils/socket";
import { useSendMessagesMutation } from "../../features/api/messageApi";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import EmojiPicker from "emoji-picker-react";

const MessageFooter = ({ user }) => {
  const currentUser = useCurrentUser();
  const fileInputRef = useRef(null);

  const [sendMessages] = useSendMessagesMutation();
  const [message, setMessage] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  useEffect(() => {
    if (currentUser?.userData?.id) {
      socket.emit('join', currentUser.userData.id);
    }
  }, [currentUser]);

  const onEmojiClick = (emojiData) => {
    setMessage((prev) => prev + emojiData.emoji);
  };


  const sendMessage = async () => {
    if (!message || message.trim().length === 0) return;

    try {
      const senderId = currentUser?.userData?.id;
      const receiverId = user?.id;

      if (!senderId || !receiverId) {
        console.error("❌ Missing senderId or receiverId:", { senderId, receiverId });
        return;
      }

      const payload = {
        senderId,
        receiverId,
        text: message.trim(),
      };

      // Try socket first
      socket.emit("send_message", payload, (ack) => {
        if (!ack || !ack.success) {
          // Fallback to HTTP API
          sendMessages({
            receiverId,
            text: message.trim(),
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

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedFile(file);

    // Create preview for images
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => setFilePreview(e.target.result);
      reader.readAsDataURL(file);
    } else {
      // For non-image files, show file icon and name
      setFilePreview(null);
    }

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const sendFileMessage = async () => {
    if (!selectedFile) return;

    setIsUploading(true);

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("receiverId", user?.id);
    if (message.trim()) {
      formData.append("text", message.trim());
    }

    try {
      const response = await sendMessages(formData).unwrap();

      // Emit through socket for real-time update
      socket.emit("send_message", {
        senderId: currentUser?.userData?.id,
        receiverId: user?.id,
        text: response.data.text,
        fileUrl: response.data.fileUrl,
        fileType: response.data.fileType,
        fileName: response.data.fileName,
      });

      console.log("✅ File uploaded successfully:", response);

      // Clear preview and message
      setSelectedFile(null);
      setFilePreview(null);
      setMessage("");
    } catch (error) {
      console.error("❌ File upload error:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const cancelFilePreview = () => {
    setSelectedFile(null);
    setFilePreview(null);
  };



  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setMessage(value)
  }


  return (
    <>
      <div className="border-t border-gray-200 px-4 py-3 flex items-center gap-3 bg-white">
        {/* Emoji Button */}
        <button
          onClick={() => setShowEmoji((prev) => !prev)}
          className="text-gray-600 hover:text-gray-800 transition"
          disabled={isUploading}
        >
          <Icons.Annoyed size={22} />
        </button>

        {showEmoji && (
          <div className="absolute bottom-16 left-12 z-50">
            <EmojiPicker onEmojiClick={onEmojiClick} />
          </div>
        )}

        {/* Attachment */}
        <button
          onClick={() => fileInputRef.current?.click()}
          className="text-gray-600 hover:text-gray-800 transition"
          disabled={isUploading}
        >
          {isUploading ? (
            <Icons.Loader2 size={22} className="animate-spin" />
          ) : (
            <Icons.Folder size={22} />
          )}
        </button>

        <input
          type="file"
          ref={fileInputRef}
          hidden
          onChange={handleFileSelect}
          accept="image/*,video/*,.pdf,.doc,.docx"
        />

        {/* Input */}
        <input
          type="text"
          placeholder="Type a message"
          value={message}
          onChange={changeHandler}
          onKeyPress={handleKeyPress}
          className="flex-1 px-4 py-2 bg-gray-100 rounded-full focus:outline-none"
          disabled={isUploading}
        />

        {/* Send */}
        <button
          onClick={sendMessage}
          className="text-gray-600 hover:text-gray-800 transition"
          disabled={isUploading || !message.trim()}
        >
          <Icons.Send size={22} />
        </button>
      </div>

      {/* File Preview Modal */}
      {selectedFile && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-md w-full mx-4 max-h-[80vh] overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">Send File</h3>
              <button
                onClick={cancelFilePreview}
                className="text-gray-500 hover:text-gray-700"
              >
                <Icons.X size={24} />
              </button>
            </div>

            {/* File Preview */}
            <div className="p-4">
              {filePreview ? (
                <img
                  src={filePreview}
                  alt="File preview"
                  className="max-w-full h-auto max-h-64 object-contain mx-auto rounded-lg"
                />
              ) : (
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <Icons.File size={48} className="text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-900">{selectedFile.name}</p>
                    <p className="text-sm text-gray-500">{selectedFile.type || 'File'}</p>
                    <p className="text-xs text-gray-400">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                </div>
              )}
            </div>

            {/* Caption Input */}
            <div className="px-4 pb-4">
              <input
                type="text"
                placeholder="Add a caption (optional)"
                value={message}
                onChange={changeHandler}
                className="w-full bg-white px-2 py-1 border border-gray-300 rounded-md focus:outline-none"
              />
            </div>

            {/* Actions */}
            <div className="flex gap-3 p-4 border-t bg-gray-50">
              <button
                onClick={cancelFilePreview}
                className="flex-1 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={sendFileMessage}
                disabled={isUploading}
                className="flex-1 px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isUploading ? (
                  <div className="flex items-center justify-center gap-2">
                    <Icons.Loader2 size={16} className="animate-spin" />
                    Sending...
                  </div>
                ) : (
                  'Send'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MessageFooter;
