import React from 'react'
import MessagePanel from '../../MessageComponents/MessagePanel'
import { Icons } from '../../../assets/Icons'
import ChatSection from '../../MessageComponents/ChatSection'
import ChatHeader from '../../MessageComponents/ChatHeader'
import MessageFooter from '../../MessageComponents/MessageFooter'

const MessageLayout = ({ onClose, user, onUserSelect }) => {
    return (
        <>
            <div>
                <Icons.X className='absolute top-2 right-2 cursor-pointer hover:bg-white/10 rounded-full p-0.5' onClick={onClose} />
            </div>
            <div className='flex bg-white rounded-xl  shadow-2xl max-w-[calc(100vw-2rem)] w-full max-h-[calc(100vh-1rem)] overflow-hidden'>
                {/* panel header */}
                <div className="flex flex-1 h-full">
                    {/* tabs */}
                    <aside className="w-80 overflow-y-auto h-screen border-r border-gray-200 Message-panel-scrollbar">
                        <ChatSection onUserSelect={onUserSelect} selectedUserId={user?.id} />
                    </aside>
                    
                    {/* main content */}
                    <div className="flex-1 flex flex-col">
                        <div className=' Message-panel-scrollbar overflow-y-auto'>

                            <ChatHeader user={user} />
                        </div>
                        <div className='overflow-y-auto Message-panel-scrollbar  max-h-[calc(80vh-80px)] h-full'>

                            <MessagePanel user={user} />
                        </div>
                        <MessageFooter user={user} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default MessageLayout