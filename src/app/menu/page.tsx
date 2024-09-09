import { lessonList } from '@/data'
import Link from 'next/link'
import React from 'react'

const MenuPage = () => {
    return (
        <div className='bg-[#003b2f] p-4 lg:px-20 xl:px-40 h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex flex-col md:flex-row items-center'>
            {lessonList.map(category => (
                <Link
                    href={category.lessontype}
                    key={category.id}
                    className='w-full h-1/3 flex items-center justify-center border border-black rounded-sm'
                    style={{ backgroundColor: '#ffffff' }}
                >
                    <div className='flex flex-col items-center justify-center text-center p-8 h-full hover:bg-[#84dd8a] transition-colors duration-300'>
                        <h1 className='uppercase font-bold text-[#003b2f] text-3xl'>{category.title}</h1>
                        <p className='text-lg my-8'>{category.desc}</p>

                    </div>
                </Link>
            ))}
        </div>
    );


}

export default MenuPage