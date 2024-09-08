import Image from 'next/image'
import React from 'react'

const Slide = () => {
    return (
        <div className='relative bg-[#003b2f] flex flex-col h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)]'>
            {/*PIC CONTAINER*/}
            <div className='absolute right-0 top-1/2 transform -translate-y-1/2 w-[400px] h-[400px] overflow-hidden'>
                <img src="/farmer.png" alt="Graphic" className='object-cover w-full h-full' />
            </div>

            {/*TEXT CONTAINER*/}
            <div className='flex flex-col items-center justify-center h-1/2 z-10 text-white'>
                <h1 className='text-4xl font-bold'>
                    Test
                </h1>
                <button className='mt-4 px-6 py-2 bg-blue-500 text-white rounded'>
                    Get Started
                </button>
            </div>
        </div>


    )
}

export default Slide