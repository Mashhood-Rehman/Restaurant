import React from 'react'
import { Icons } from '../../assets/Icons'
import { IMAGES } from '../../assets/Images'


const ChatHeader = ({user}) => {
    return (
        <div>
            <div className='flex px-4 py-1 items-center pb-12 justify-between'>
                {/* first div  */}
                <div>
                    <div className='flex items-center space-x-2'>
                        <img src={ user?.profileImg ?? IMAGES.DUMMYIMG } alt="profile  image" className='size-16 rounded-full' />
                        <h1>{user?.name}</h1>
                    </div>
                </div>
                {/* second div  */}
                <div className='bg-white/10 p-3 rounded-lg'>
                    <Icons.Phone className='text-black' size={20} />
                </div>
            </div>
        </div>
    )
}

export default ChatHeader
