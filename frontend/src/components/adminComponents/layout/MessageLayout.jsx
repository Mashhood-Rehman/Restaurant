import React from 'react'
import MessagePanel from '../../MessageComponents/MessagePanel'
import { IMAGES } from '../../../assets/Images'
import { Icons } from '../../../assets/Icons'
import ChatSection from '../../MessageComponents/ChatSection'
import ChatHeader from '../../MessageComponents/ChatHeader'
import MessageFooter from '../../MessageComponents/MessageFooter'

const MessageLayout = () => {
    return (
        <>
            <div className='flex flex-col p-4'>
                {/* panel header */}
                <div className="flex flex-1 ">
                    {/* tabs */}
                    <aside className=" w-96 overflow-y-auto max-h-[calc(90vh-80px)]">
                        <ChatSection />
                    </aside>
                    {/* main content */}
                    <div className="bg-white px-4 py-2 flex-1 ">
                        <div className='overflow-y-auto max-h-[calc(90vh-80px)]'>

                            <ChatHeader />
                            <div className=''>

                                <MessagePanel />
                            </div>
                        </div>
                        <MessageFooter />                </div>
                </div>
                {/* panel footer  */}
            </div>
        </>
    )
}

export default MessageLayout