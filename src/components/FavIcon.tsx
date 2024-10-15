import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const FavIcon = () => {
    return (
        <div>
            <Link href="/fav" className='flex items-center gap-4'>
                <div className='relative w-12 h-12 '>
                    <Image src="/fav.png" alt="" fill />
                </div>

            </Link>
        </div>
    )
}

export default FavIcon