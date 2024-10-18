// app/myquestionboard/page.tsx

import React from 'react';
import Link from 'next/link'; // Import Link for navigation
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Book, MessageCircleQuestion, Plus } from 'lucide-react';
import { Questionborad } from '../../../types/types';
import { CopyEventLinkButton } from '@/components/CopyLinkButton';



const getData = async (): Promise<Questionborad[]> => {
    const res = await fetch("http://localhost:3000/api/questionborad", {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Failed to fetch question boards!");
    }

    return res.json();
};

const QuestionboardPage = async () => {
    let questions: Questionborad[] = [];

    try {
        questions = await getData();
    } catch (error) {
        console.error(error);
        // You can handle the error gracefully here
        return (
            <div>
                <h1>Question Boards</h1>
                <p>Failed to fetch question boards.</p>
            </div>
        );
    }


    return (
        <div className="flex flex-col items-center w-full">
            <h1 className="text-2xl font-bold mb-4">Question Boards</h1>

            {/* ปุ่มสำหรับสร้าง Questionboard */}
            <Link href="/addquestionboard">
                <Card
                    className="w-full p-4 border-dashed border-[3px] border-spacing-4 grid place-items-center group hover:bg-[#f0f0f0] transition-colors duration-300"
                >
                    <CardHeader className="flex items-center justify-center space-x-2">
                        <Plus className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                        <CardTitle className="text-lg font-bold">Create Questionboard</CardTitle>
                    </CardHeader>
                </Card>
            </Link>


            {questions.length === 0 ? (
                <p>No question boards found.</p>
            ) : (
                <div className="flex flex-col w-full space-y-4">
                    {questions.map((question) => (
                        <Link key={question.id} href={`/myquestionboard/${question.id}`}>
                            <Card
                                className="w-full p-4 bg-[#79b6ac] border border-gray-300 rounded-md shadow-md hover:bg-[#80e0c1] transition-colors duration-300"
                            >
                                <CardHeader className="flex items-center justify-between">
                                    <CardTitle className="text-xl font-bold text-white">
                                        {question.topic}
                                    </CardTitle>
                                    <MessageCircleQuestion className="text-white" size={28} strokeWidth={2.5} />
                                </CardHeader>
                                <CardContent>
                                    <p className="text-white text-sm">{question.content}</p>
                                    {question.img && (
                                        <img src={question.img} alt={question.topic} className="mt-2 mb-2 rounded-md" />
                                    )}
                                    <p className="text-white text-xs">
                                        Created At: {new Date(question.createdAt).toLocaleString()}
                                    </p>
                                    <p className="text-white text-xs">
                                        Posted By: {question.owner?.name || 'Unknown'}
                                    </p>


                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );

};

export default QuestionboardPage;
