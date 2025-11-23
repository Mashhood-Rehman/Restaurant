import React from 'react'
import MessagePanel from '../../MessageComponents/MessagePanel'
import { IMAGES } from '../../../assets/Images'
import { Icons } from '../../../assets/Icons'
import ChatSection from '../../MessageComponents/ChatSection'
import ChatHeader from '../../MessageComponents/ChatHeader'
import MessageFooter from '../../MessageComponents/MessageFooter'

const MessageLayout = ({onClose, user}) => {
    return (
        <>
        <div>
        <Icons.X className='absolute top-2 right-2 cursor-pointer hover:bg-white/10 rounded-full p-0.5' onClick={onClose} />
        </div>
            <div className='flex mt-3 flex-col p-4'>
                {/* panel header */}
                <div className="flex flex-1 ">
                    {/* tabs */}
                    <aside className=" w-96 overflow-y-auto max-h-[calc(90vh)] Message-panel-scrollbar">
                        <ChatSection />
                    </aside>
                    {/* main content */}
                    <div className="bg-white px-4 py-2 flex-1 ">
                        <div className='max-h-[calc(90vh-80px)] Message-panel-scrollbar overflow-y-auto'>

                            <ChatHeader user={user} />
                            <div className='overflow-y-auto Message-panel-scrollbar max-h-[calc(90vh-80px)]'>

                                <MessagePanel />
                            </div>
                        </div>
                        <MessageFooter user={user} />                </div>
                </div>
                {/* panel footer  */}
            </div>
        </>
    )
}

export default MessageLayout