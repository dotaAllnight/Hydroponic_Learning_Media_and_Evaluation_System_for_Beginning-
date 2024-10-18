import { LessonType } from '@prisma/client';
import Link from 'next/link';
import React from 'react';
import { Lesson } from '../../../types/types';

type GetDataResponse = {
    lessonTypes: LessonType[];
    lessons: Lesson[];
};


const getData = async (): Promise<GetDataResponse> => {
    const res = await fetch("http://localhost:3000/api/categories", {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Failed to fetch categories!");
    }

    const lessonTypes: LessonType[] = await res.json();

    // ดึง lessons ทั้งหมด
    const lessonsRes = await fetch("http://localhost:3000/api/lessons", {
        cache: "no-store",
    });

    if (!lessonsRes.ok) {
        throw new Error("Failed to fetch lessons!");
    }

    const lessons: Lesson[] = await lessonsRes.json();

    return { lessonTypes, lessons };
};

const MenuPage = async () => {
    const { lessonTypes, lessons } = await getData();


    return (
        <div className="bg-[#03fc9d] p-4 lg:px-20 xl:px-40 h-screen flex flex-col justify-center items-center">
            <div className="text-[#01a36b] text-center mt-30 smb-2 py-2">
                <h2 className="text-[#01a36b] text-center mt-10 mb-2 text-4xl font-bold justify-start">
                    Search By Lesson Types
                </h2>

                <img src="/farmPic.svg" alt="Winners" className="mb-37" />

            </div>
            <div className="flex flex-wrap justify-center">
                {lessonTypes.map((lessonType) => (
                    <Link
                        key={lessonType.id}
                        href={`/menu/${lessonType.id}`}
                        className="flex-1 min-w-[250px] max-w-[300px] h-[150px] bg-[#ffffff] border border-gray-300 rounded-lg p-3 m-2 flex items-center justify-center transition hover:bg-[#84dd8a]"
                    >
                        <h2 className="text-[#003b2f] text-2xl font-bold text-center">
                            {lessonType.typeName}
                        </h2>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default MenuPage;


