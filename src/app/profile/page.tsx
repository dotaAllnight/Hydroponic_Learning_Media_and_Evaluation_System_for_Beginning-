"use client";

import { useSession } from "next-auth/react";
import React from "react";

const ProfilePage = () => {
    const { data: session, status } = useSession();

    if (status === "loading") {
        return <p>Loading...</p>;
    }

    if (!session) {
        return <p>You need to be logged in to view this page</p>;
    }

    const { user } = session;

    return (
        <div className='w-screen min-h-screen flex items-center justify-center bg-gray-100'>
            <div className='bg-white p-6 rounded-lg shadow-lg w-[350px]'>
                <div className='flex flex-col items-center'>
                    {/* PROFILE IMAGE */}

                    {/* USER DETAILS */}
                    <h2 className='text-xl font-bold mt-4'>{user.name}</h2>
                    <p className='text-gray-600'>{user.email}</p>

                    {/* ROLE DISPLAY */}
                    {user.role && (
                        <p className='mt-2 p-2 bg-green-200 rounded-lg text-green-700'>
                            Role: {user.role}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
