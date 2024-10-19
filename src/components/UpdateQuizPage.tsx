"use client"

import { ChevronRight } from 'lucide-react';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import { useParams } from 'next/navigation';
import { useState } from 'react';

type QuizClientProps = {
    game: {
        id: string;
        topic: string;
        timeStarted: Date;
        questions: {
            id: string;
            question: string;
            userAnswer: string | null; // ให้รองรับ null
            options: {
                id: string;
                text: string;
                isCorrect: boolean;
            }[];
        }[];
    } | null; // Allow game to be null;
};


const UpdateQuizPage = ({ game }: QuizClientProps) => {
    const { id } = useParams();


    // ตรวจสอบว่ามีข้อมูล game หรือไม่
    if (!game || !game.questions) {
        return <div>Loading game data...</div>; // แสดงผลถ้าข้อมูลยังไม่พร้อม
    }

    const [questionIndex, setQuestionIndex] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(game.questions[0]);
    const [options, setOptions] = useState(currentQuestion.options);
    const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
    const [updatedQuestion, setUpdatedQuestion] = useState(currentQuestion.question);




    // ฟังก์ชันสำหรับอัปเดตข้อมูลใน state
    const handleUpdateOption = (index: number, value: string, isCorrect: boolean) => {
        const newOptions = options.map((option, idx) =>
            idx === index ? { ...option, text: value, isCorrect: isCorrect } : option
        );
        setOptions(newOptions);
    };

    const handleUpdateQuestion = (value: string) => {
        setUpdatedQuestion(value);
    };

    const handleNext = () => {
        if (questionIndex < game.questions.length - 1) {
            setQuestionIndex(prev => prev + 1);
            setCurrentQuestion(game.questions[questionIndex + 1]);
            setOptions(game.questions[questionIndex + 1].options);
        }
    };

    const handleSubmitUpdate = async () => {
        const questionId = currentQuestion.id; // Get the ID of the current question

        try {
            const res = await fetch(`/api/games/${questionId}`, { // Use questionId here
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    question: updatedQuestion,
                    options: options,
                }),
            });
            if (res.ok) {
                alert("Updated successfully!");
            } else {
                const errorResponse = await res.json();
                console.error("Failed to update:", errorResponse);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };




    return (
        <div style={{ backgroundColor: '#003b2f', padding: '20px', position: 'relative', height: '100vh', width: '100vw' }}>
            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:w-[80vm] max-w-4xl w-[90vw] '>
                <div className='flex flex-row justify-between'>
                    <div className="flex flex-col">
                        <p>
                            <span className='mr-2 text-slate-400'>Topic</span>
                            <span className='px-2 py-1 text-green-900 rounded-lg bg-[#03fc9d]'>
                                {game.topic}
                            </span>
                        </p>
                    </div>
                </div>

                {/* แสดงฟอร์มสำหรับแก้ไขคำถาม */}
                <Card className='w-full mt-4 bg-[#03fc9d]'>
                    <CardHeader className='flex flex-row items-center'>
                        <CardTitle className='mr-5 text-center divide-y divide-zinc-400'>
                            <div>{questionIndex + 1}</div>
                            <div className='text-sm text-slate-400'>
                                {game.questions.length}
                            </div>
                        </CardTitle>
                        <CardDescription>
                            <div className='text-xl font-semibold text-[#01a36b]'>
                                <input
                                    className='w-full p-2 text-black'
                                    type='text'
                                    value={updatedQuestion}
                                    onChange={(e) => handleUpdateQuestion(e.target.value)}
                                />
                            </div>
                        </CardDescription>
                    </CardHeader>
                </Card>

                {/* แสดงฟอร์มสำหรับแก้ไขตัวเลือก */}
                <div className='flex flex-col items-center justify-center w-full mt-4 '>
                    {options.map((option, index) => {
                        return (
                            <div key={index} className="flex items-center w-full mb-4">
                                <input
                                    className={`flex-1 py-2 px-4 mr-2 ${option.isCorrect ? 'bg-green-300' : 'bg-red-300'} text-black`}
                                    type="text"
                                    value={option.text}
                                    onChange={(e) => handleUpdateOption(index, e.target.value, option.isCorrect)}
                                />
                                <Button
                                    className={option.isCorrect ? 'bg-green-500' : 'bg-red-500'}
                                    onClick={() => handleUpdateOption(index, option.text, !option.isCorrect)}
                                >
                                    {option.isCorrect ? 'Correct' : 'Wrong'}
                                </Button>
                            </div>
                        )
                    })}

                    {/* ปุ่มสำหรับเลื่อนไปยังคำถามถัดไป */}
                    <Button className='mt-2  bg-[#03fc9d] text-green-900' onClick={handleNext}>
                        Next <ChevronRight className='w-4 h-5 ml-2' />
                    </Button>

                    {/* ปุ่มสำหรับส่งข้อมูลที่อัปเดต */}
                    <Button className='mt-2 bg-blue-500 text-white' onClick={handleSubmitUpdate}>
                        Submit Updates
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default UpdateQuizPage;