import Link from 'next/link';
import React from 'react'

type Props = {}




function Adminmenupage({ }: Props) {
    return (

        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Admin Menu</h1>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {/* Card 1 */}
                <div className="bg-gray-200 shadow-md rounded-lg overflow-hidden">
                    <div className="p-4">
                        <h2 className="font-semibold text-xl">Management Lesson</h2>
                        <p className="text-gray-600 mt-2">update lesson here...</p>
                    </div>
                    <div className="flex justify-end p-4">
                        <Link href="/admin">
                            <button className="px-4 py-2 bg-green-500 text-white rounded">Continue</button>
                        </Link>
                    </div>
                </div>




                {/* Card 2 */}
                <div className="bg-gray-200 shadow-md rounded-lg overflow-hidden">
                    <div className="p-4">
                        <h2 className="font-semibold text-xl">Management Quiz</h2>
                        <p className="text-gray-600 mt-2">update quiz here...</p>
                    </div>
                    <div className="flex justify-end p-4">
                        <Link href="/updatequiz">
                            <button className="px-4 py-2 bg-green-500 text-white rounded">Continue</button>
                        </Link>

                    </div>
                </div>

                {/* Card 2 */}
                <div className="bg-gray-200 shadow-md rounded-lg overflow-hidden">
                    <div className="p-4">
                        <h2 className="font-semibold text-xl">View static</h2>
                        <p className="text-gray-600 mt-2"></p>
                    </div>
                    <div className="flex justify-end p-4">
                        <Link href="/graphe">
                            <button className="px-4 py-2 bg-green-500 text-white rounded">Continue</button>
                        </Link>
                    </div>
                </div>


                {/* Add more cards as needed */}
            </div>
        </div>
    );
}

export default Adminmenupage;
