import Image from 'next/image'
import React from 'react'

const Featured = () => {
    return (
        <div className='w-screen bg-[#03fc9d] overflow-x-scroll text-red-700'>
            {/*WRAPPER */}
            <div className='w-max flex'>
                {/*SINGLE ITEM */}
                <div className='w-screen h-[60vh] flex flex-col items-center justify-around p-4'>
                    {/* IMAGE CONTAINER */}
                    <div className='relative flex-1 w-full'>
                        <Image
                            src="/temporary/p1.png"
                            alt="" fill
                            className='object-contain'
                        />
                    </div>
                    {/*TEXT CONTAINER */}
                    <div className='flex-1 flex flex-col gap-4'>
                        <h1 className='text-xl font-bold uppercase'>LessonTitle</h1>
                        <p>Description</p>

                        <button className='bg-green-700 text-white p-2 rounded-md'>Add to Favorite</button>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Featured