import { featuredLessons } from '@/data'
import Image from 'next/image'
import React from 'react'

const Featured = () => {
    return (
        <div className='w-screen bg-gradient-to-r from-[#03fc9d] to-[#028a6b] text-[#003b2] min-h-screen flex items-center justify-center'>
            {/* WRAPPER */}
            {/* WRAPPER */}
            <div className='flex space-x-4 p-4'>
                {/* SINGLE ITEM */}
                {featuredLessons.map(item => (
                    <div
                        key={item.lessonId}
                        className='w-[300px] h-[400px] flex flex-col items-center justify-around p-4 bg-gray-200 border border-gray-300 rounded-lg shadow-lg hover:bg-white transition-all duration-300'
                    >
                        {/* IMAGE CONTAINER */}
                        {item.img && (
                            <div className='relative flex-1 w-full h-2/3'>
                                <Image
                                    src={item.img}
                                    alt=""
                                    fill
                                    className='object-contain'
                                />
                            </div>
                        )}

                        {/* TEXT CONTAINER */}
                        <div className='flex-1 flex flex-col items-center text-center gap-4'>
                            <h1 className='text-xl font-bold uppercase'>{item.lessontitle}</h1>
                            <p className='p-4'>{item.description}</p>

                            <button className='bg-green-700 text-white p-2 rounded-md'>Add to Favorite</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>

    )
}

export default Featured