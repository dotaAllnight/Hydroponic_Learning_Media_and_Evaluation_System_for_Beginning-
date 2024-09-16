"use client";

import React, { useState } from 'react';
import Image from 'next/image'; // หากใช้รูป
import { Lesson } from '../../types/types';

type DeleteLessonPageProps = {
    lessons: Lesson[];
};

const deleteLesson = async (lessonId: string) => {
    const res = await fetch(`http://localhost:3000/api/lessons/${lessonId}`, {
        method: 'DELETE',
    });

    if (!res.ok) {
        throw new Error("Failed to delete lesson");
    }

    return res.json();
};

const DeleteLessonPage = ({ lessons: initialLessons }: DeleteLessonPageProps) => {
    const [lessons, setLessons] = useState<Lesson[]>(initialLessons);

    const handleDelete = async (lessonId: string) => {
        try {
            await deleteLesson(lessonId);
            setLessons(lessons.filter((lesson) => lesson.lessonId !== lessonId));
        } catch (err) {
            console.error("Failed to delete lesson", err);
        }
    };

    return (
        <div className='w-screen bg-gradient-to-r from-[#03fc9d] to-[#028a6b] text-[#003b2f] min-h-screen flex items-center justify-center'>
            {/* WRAPPER */}
            <div className='flex flex-wrap justify-center space-x-4 p-4'>
                {/* SINGLE ITEM */}
                {lessons.map((lesson) => (
                    <div
                        key={lesson.lessonId}
                        className='w-[300px] h-[400px] flex flex-col items-center justify-around p-4 bg-gray-200 border border-gray-300 rounded-lg shadow-lg hover:bg-white transition-all duration-300 m-4'
                    >
                        {/* IMAGE CONTAINER */}
                        {lesson.img && (
                            <div className='relative flex-1 w-full h-2/3'>
                                <Image
                                    src={lesson.img}
                                    alt={lesson.title}
                                    fill
                                    className='object-contain'
                                />
                            </div>
                        )}

                        {/* TEXT CONTAINER */}
                        <div className='flex-1 flex flex-col items-center text-center gap-4'>
                            <h1 className='text-xl font-bold uppercase'>{lesson.title}</h1>


                            {/* DELETE BUTTON */}
                            <button
                                onClick={() => handleDelete(lesson.lessonId)}
                                className='bg-red-600 text-white p-2 rounded-md hover:bg-red-700 transition-all duration-300'
                            >
                                Delete Lesson
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DeleteLessonPage;
