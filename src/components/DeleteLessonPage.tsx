"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Lesson } from '../../types/types';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { BookAudio, BrainCircuit, Plus, Trash } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogOverlay,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';

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
    const [openDialog, setOpenDialog] = useState(false);
    const router = useRouter();

    const handleDelete = async (lessonId: string) => {
        try {
            await deleteLesson(lessonId);
            setLessons(lessons.filter((lesson) => lesson.lessonId !== lessonId));
            toast.success("The Lesson has been deleted!");
            router.push("/menu")
        } catch (err) {
            console.error("Failed to delete lesson", err);
            toast.success("Something went wrong");
        }
    };

    return (

        <div className='w-screen bg-[#f2f2f2] min-h-screen flex items-center justify-center'>



            {/* WRAPPER */}
            <div className='flex flex-wrap justify-center space-x-4 p-4'>
                <ToastContainer />
                {/* SINGLE ITEM */}
                {lessons.map((lesson) => (
                    <Card key={lesson.lessonId} className="w-full max-w-md h-60 p-4 bg-[#CDCDCD] border border-gray-300 rounded-md shadow-md hover:bg-[#e4e9e7] transition-colors duration-300">
                        <CardHeader className='flex flex-row items-center justify-between pb-2 space-y-0'>
                            <CardTitle className='text-2xl font-bold text-[#005691]'>
                                {lesson.title}
                            </CardTitle>

                        </CardHeader>


                        <CardContent>
                            <p className='text-sm text-muted-foreground'>Delete Lesson here!</p>
                            <button
                                onClick={() => setOpenDialog(true)}
                                className='bg-transparent text-red-600 hover:bg-red-100 p-2 rounded-md transition-all duration-300 mt-4 flex justify-between items-center w-70'
                            >
                                <span className='flex-grow'></span>
                                <Trash size={20} className='w-4 h-4 ml-2' />
                            </button>

                            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                                <DialogOverlay />
                                <DialogContent>
                                    <DialogTitle>Confirm Delete</DialogTitle>
                                    <DialogDescription>
                                        Are you sure you want to delete your Lesson?
                                    </DialogDescription>
                                    <div className="flex justify-end">
                                        <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
                                        <Button
                                            onClick={() => handleDelete(lesson.lessonId)}
                                            className='ml-2'
                                            variant='destructive'>
                                            Continue
                                        </Button>
                                    </div>
                                </DialogContent>
                            </Dialog>




                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>



    );
};

export default DeleteLessonPage;
