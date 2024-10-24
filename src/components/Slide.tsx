"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const data = [
    {
        id: 1,
        title: "Dive into our fun and challenging quizzes! Challenge yourself and see how much you really know. Join now and start quizzing! ",
        image: "/quiz.png",
    },
    {
        id: 2,
        title: "Plant a tree with us and watch it grow. Simple, impactful, and rewarding. Start planting today! , we can nurture our planet and cultivate hope for a sustainable future. 🌍✨",
        image: "/farmer.png",

    },

];


const Slide = () => {
    const [currentSlide, setCurrentSlide] = useState(1)

    useEffect(() => { })

    return (



        <div className='relative bg-[#003b2f] flex flex-col h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)]'>
            {/* PIC CONTAINER */}
            <div className='absolute bottom-0 right-0 w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] md:w-[400px] md:h-[400px] lg:w-[350px] lg:h-[350px] overflow-hidden'>
                <Image src={data[currentSlide].image} alt="" fill className='object-cover' />
            </div>

            {/* IMAGE2 CONTAINER */}
            <div className='absolute top-1/2 p-7 left-0 transform -translate-y-1/2 w-[250px] h-[250px] sm:w-[200px] sm:h-[200px] md:w-[400px] md:h-[400px] lg:w-[250px] lg:h-[250px] overflow-hidden'>
                <Image src="/earth.png" alt="" layout="fill" className='object-cover' />
            </div>



            {/* TEXT AND BUTTON CONTAINER */}
            <div className='flex flex-col items-center justify-center h-1/2 z-10 text-white'>
                <h1 className='text-4xl text-center font-bold p-4 leading-relaxed'>
                    {data[currentSlide].title}
                </h1>
                <a href="/quizpage" className='mt-4 px-10 py-2 bg-[#03fc9d] text-[#003b2f] font-semibold rounded'>
                    Get Started
                </a>
            </div>
        </div>


    )
}

export default Slide