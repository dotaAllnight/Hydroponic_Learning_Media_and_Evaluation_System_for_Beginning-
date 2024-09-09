import Link from 'next/link'
import React from 'react'
import Menu from './Menu'
import FavIcon from './FavIcon'

const Navbar = () => {

    const user = false
    return (
        <div className='bg-[#f2f2f2] h-15 text-[#8d7884] font-semibold p-4 flex items-center justify-between border-b-red-500 uppercase md:h-24 lg:px-20 xl:px-40'>
            {/*LOGO - KM APP */}
            <div className='text-2xl font-bold text-[#003b2f]'>
                <Link href="/">KM APP</Link>
            </div>

            {/*LEFT LINKS*/}
            <div className='hidden text-2xl md:flex gap-12 ml-auto'>
                <Link href="/">Home</Link>
                <Link href="/menu">Lesson </Link>
                <Link href="/">QUIZ</Link>
                <Link href="/"> Q&A </Link>
                <Link href="/">Contact</Link>
            </div>

            {/*MOBILE*/}
            <div className='md:hidden ml-auto'>
                <Menu />
            </div>

            {/*RIGHT LINKS*/}
            <div className='hidden md:flex gap-4 ml-auto'>
                <FavIcon />
                {!user ? (
                    <Link href="/login" className='bg-[#003b2f] text-[#02fda2] px-4 py-2 rounded-lg'>Login</Link>
                ) : (
                    <Link href="/order">Order</Link>
                )}

            </div>
        </div>

    )
}

export default Navbar