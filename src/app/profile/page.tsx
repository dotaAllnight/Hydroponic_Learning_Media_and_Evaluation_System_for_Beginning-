"use client"

import { useSession } from "next-auth/react";
import { ScrollArea } from '@/components/ui/scroll-area';
import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// สร้าง interface สำหรับโครงสร้างประวัติการเรียน
interface HistoryLesson {
    id: string;
    lesson: {
        title: string;
    };
    learnDate: string;
}

const ProfilePage = () => {
    const { data: session, status } = useSession();
    const [historyLessons, setHistoryLessons] = useState<HistoryLesson[]>([]); // ระบุประเภทข้อมูลเป็น HistoryLesson[]
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (session?.user) {
            // เรียก API ประวัติการเรียนเมื่อ session user พร้อมแล้ว
            fetch(`/api/historyLesson`)
                .then((res) => res.json())
                .then((data) => {
                    setHistoryLessons(data.historyLessons); // สมมติว่าข้อมูลมาจากฟิลด์ historyLessons ใน JSON response
                    setLoading(false);
                })
                .catch((error) => {
                    console.error("Error fetching history lessons:", error);
                    setLoading(false);
                });
        }
    }, [session?.user]);



    if (!session) {
        return <p className="items-center font-semibold">You need to be logged in to view this page</p>;
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

                    {/* LEARNING HISTORY */}
                    <div className="mt-8">
                        <h3 className='text-lg font-bold'>Learning History</h3>
                        {historyLessons.length > 0 ? (
                            <ScrollArea className='mt-4 h-40'> {/* กำหนดความสูงให้ ScrollArea */}
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Lesson</TableHead>
                                            <TableHead>Date Completed</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {historyLessons.map((history) => (
                                            <TableRow key={history.id}>
                                                <TableCell>{history.lesson.title}</TableCell>
                                                <TableCell>{new Date(history.learnDate).toLocaleDateString()}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </ScrollArea>
                        ) : (
                            <p className='text-gray-600 mt-2'>No learning history available.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
