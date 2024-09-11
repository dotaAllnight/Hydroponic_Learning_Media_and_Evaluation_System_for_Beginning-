import { singleLessonPage } from '@/data'
import Image from 'next/image'
import React from 'react'

export const SingleProduct = () => {
    return (
        <div className='p-4 lg:px-20 xl:px-40 h-screen flex flex-col md:flex-row justify-center items-center text-gray-600'>

            {/* Video Container */}
            <div className='flex flex-col items-center md:w-1/2 mb-4 md:mb-0'>
                {singleLessonPage.videolink && (
                    <iframe
                        width="560"
                        height="500"
                        src={singleLessonPage.videolink}
                        title="YouTube video player"

                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className='w-full'
                    ></iframe>
                )}
            </div>

            {/* Text Container */}
            <div className='flex flex-col items-center md:w-1/2'>
                <h1 className='text-2xl font-bold mb-4'>{singleLessonPage.lessontitle}</h1>
                <p className='text-lg'>{singleLessonPage.description}</p>
                {singleLessonPage.img && (
                    <div className='mt-4'>
                        <Image
                            src={singleLessonPage.img}
                            alt={singleLessonPage.lessontitle}
                            width={500}
                            height={300}
                            className='rounded-lg'
                        />
                    </div>
                )}
            </div>

        </div>
    );
};

export default SingleProduct