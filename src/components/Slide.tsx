import Image from 'next/image'
import React from 'react'

const Slide = () => {

    const data = [
        {
            id: 1,
            title: "Dive into our fun and challenging quizzes! Challenge yourself and see how much you really know. Join now and start quizzing! ",
            image: "/farmer.png",
        },
        {
            id: 2,
            title: "Plant a tree with us and watch it grow. Simple, impactful, and rewarding. Start planting today!",
            image: "/",
        },

    ]










    return (
        <div className='relative bg-[#003b2f] flex flex-col h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)]'>
            {/*PIC CONTAINER*/}
            <div className='absolute right-0 top-1/2 transform -translate-y-1/2 w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] md:w-[400px] md:h-[400px] lg:w-[350px] lg:h-[350px]:overflow-hidden'>
                <img src="/farmer.png" alt="Graphic" className='object-cover w-full h-full' />
            </div>

            {/*TEXT CONTAINER*/}
            <div className='flex flex-col items-center justify-center h-1/2 z-10 text-white'>
                <h1 className='text-4xl text-center font-bold p-4 '>
                    Hydroponic Knowlead Managment
                </h1>
                <button className='mt-4 px-6 py-2 bg-[#03fc9d] text-white rounded'>
                    Get Started
                </button>
            </div>
        </div>


    )
}

export default Slide