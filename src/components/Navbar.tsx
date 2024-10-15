"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Menu from './Menu'
import FavIcon from './FavIcon'
import UserLinks from './UserLinks'
import { useSession } from 'next-auth/react' // ใช้เพื่อดึงข้อมูล session

const Navbar = () => {
    const { data: session, status } = useSession(); // ดึงข้อมูล session จาก next-auth
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {

        if (session?.user?.role === 'Admin') {
            setIsAdmin(true);
        } else {
            setIsAdmin(false);
        }
    }, [session]);

    return (
        <div className='bg-[#f2f2f2] h-15 text-[#8d7884] font-semibold p-4 flex items-center justify-between border-b-red-500 uppercase md:h-24 lg:px-20 xl:px-40'>
            {/*LOGO - KM APP */}
            <div className='text-2xl font-bold text-[#003b2f]'>
                <Link href="/">KM APP</Link>
            </div>

            {/*LEFT LINKS*/}
            <div className='hidden text-xl md:flex gap-12 ml-auto'>

                <Link href="/">Home</Link>
                <Link href="/menu">Lesson </Link>
                <Link href="/quizpage">QUIZ</Link>
                <Link href="/myquestionboard"> Q&A </Link>
                <Link href="/">Contact</Link>
                <Link href="/profile">Profile</Link>
                {/* ลิงก์ Admin จะแสดงเฉพาะเมื่อ role เป็น admin */}
                {isAdmin && (
                    <Link href="/admin/adminmenu">Admin</Link>
                )}
            </div>

            {/*MOBILE*/}
            <div className='md:hidden ml-auto'>
                <Menu />
            </div>

            {/*RIGHT LINKS*/}
            <div className='hidden md:flex gap-4 ml-auto'>
                <FavIcon />
                <UserLinks />
            </div>
        </div>
    )
}

export default Navbar