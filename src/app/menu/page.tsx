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
        <div className="bg-[#03fc9d] p-4 lg:px-20 xl:px-40 h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex flex-col md:flex-row flex-wrap items-center">
            <div className="text-[#01a36b] text-center w-full mb-4 py-2">
                <span className="text-4xl font-bold">Search By Lesson Types</span>
            </div>
            {lessonTypes.map((lessonType) => (
                <Link
                    key={lessonType.id}
                    href={`/menu/${lessonType.id}`}
                    className="flex-1 min-w-[300px] max-w-[400px] h-[200px] bg-[#ffffff] border border-gray-300 rounded-lg p-4 m-2 flex items-center justify-center transition hover:bg-[#84dd8a]"
                >
                    <h2 className="text-[#003b2f] text-3xl font-bold text-center">
                        {lessonType.typeName}
                    </h2>
                </Link>
            ))}
            {/**{lessons.map((lesson) => (
                <div key={lesson.lessonId} className="p-4 border border-gray-200 m-2 rounded-lg">
                    <h3 className="text-lg font-bold">{lesson.title}</h3>
                    <p>{lesson.description}</p>
                </div>
            ))} */}

        </div>
    );
};

export default MenuPage;


