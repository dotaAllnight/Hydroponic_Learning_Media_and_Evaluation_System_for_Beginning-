"use client"
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';

const UserLinks = () => {
    const { status } = useSession();

    return (
        <div>
            {status === "authenticated" ? (
                <div>
                    <Link href="/fav"></Link>
                    <button
                        onClick={() => signOut()}
                        className="ml-4 bg-red-500 text-white px-4 py-2 rounded-lg"
                    >
                        Logout
                    </button>
                </div>
            ) : (
                <Link
                    href="/login"
                    className='bg-[#003b2f] text-[#02fda2] px-4 py-2 rounded-lg'
                >
                    Login
                </Link>
            )}
        </div>
    );
};

export default UserLinks;
