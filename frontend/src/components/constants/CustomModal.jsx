import React from 'react'

const CustomModal = ({ isOpen, onClose, children, heading }) => {
    if (!isOpen) return
    return (
        <div>
            <div className=' w-auto bg-white h-full p-4 rounded-2xl overflow-hidden'>
                <div>
                    <div>
                        <h1>{heading}</h1>
                    </div>
                    <div onClick={onClose} className=' text-black size-4 bg-white hover:bg-gray-300 rounded-full p-1 ease-in-out transform'>
                        X
                    </div>
                </div>

                <div className='overflow-y-auto py-3 px-2'>
                    {children}
                </div>
            </div>

        </div>
    )
}

export default CustomModal