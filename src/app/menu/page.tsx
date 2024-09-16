import { LessonType } from '@prisma/client';
import Link from 'next/link';
import React from 'react';

const getData = async (): Promise<LessonType[]> => {
    const res = await fetch("http://localhost:3000/api/categories", {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Failed!");
    }

    return res.json();
};


const MenuPage = async () => {
    const lessonTypes: LessonType[] = await getData();

    return (
        <div className="bg-[#003b2f] p-4 lg:px-20 xl:px-40 h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex flex-col md:flex-row flex-wrap items-center">
            <div className="bg-[#003b2f] text-white text-center w-full mb-4 py-2">
                <span className="text-4xl font-bold">Search By Lesson Types</span>
            </div>
            {lessonTypes.map((lessonType) => (
                <Link
                    key={lessonType.id}
                    href={`/menu/${lessonType.id}`}
                    className="flex-1 min-w-[300px] max-w-[400px] h-[200px] bg-[#03fc9d] border border-gray-300 rounded-lg p-4 m-2 flex items-center justify-center transition hover:bg-[#84dd8a]"
                >
                    <h2 className="text-[#003b2f] text-3xl font-bold text-center">
                        {lessonType.typeName}
                    </h2>
                </Link>
            ))}
        </div>
    );

};

export default MenuPage