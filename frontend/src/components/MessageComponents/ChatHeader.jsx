import React from 'react'
import { Icons } from '../../assets/Icons'
import { IMAGES } from '../../assets/Images'


const ChatHeader = ({user}) => {
    return (
        <div>
            <div className='flex items-center justify-between'>
                {/* first div  */}
                <div>
                    <div className='flex items-center space-x-2'>
                        <img src={user?.profileImg ? user?.profileImg : IMAGES.PERSONPLACEHOLDER} alt="person placeholder image" height={50} width={50} className='rounded-full' />
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
