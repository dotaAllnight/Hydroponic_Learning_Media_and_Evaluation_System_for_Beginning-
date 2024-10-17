//QuizClient.tsx
"use client"
import React from 'react';
import { useState } from 'react';
import { Card, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import axios from 'axios';
import { useToast } from '@/hooks/use-toast';

import { BarChart, ChevronRight, Timer } from 'lucide-react';
import Link from 'next/link';
import QuizCount from './QuizCount';
import Loading from './Loading';

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
    };
}

const QuizClient: React.FC<QuizClientProps> = ({ game }) => {
    const [questionIndex, setQuestionIndex] = React.useState(0);
    const [selectedChoice, setSelectedChoice] = React.useState<number | null>(null);
    const [correctAnswers, setCorrectAnswers] = React.useState<number>(0);
    const [wrongAnswers, setWrongAnswers] = React.useState<number>(0);
    const { toast } = useToast();
    const [hasEnded, setHasEnded] = React.useState<boolean>(false);
    const [showLoader, setShowLoader] = React.useState(true);
    const [finished, setFinished] = React.useState(false);




    const currentQuestion = React.useMemo(() => {
        return game.questions[questionIndex];
    }, [questionIndex, game.questions])


    const options = React.useMemo(() => {
        if (!currentQuestion) return [];
        return currentQuestion.options.map(option => ({
            id: option.id,
            text: option.text,
            isCorrect: option.isCorrect,
        }))
    }, [currentQuestion])



    const handleNext = React.useCallback(async () => {
        if (selectedChoice !== null && currentQuestion) {
            setShowLoader(true); // เริ่มแสดง loader
            try {
                const userAnswerId = options[selectedChoice].id;
                const response = await axios.post('/api/checkAnswer', {
                    questionId: currentQuestion.id,
                    userAnswer: userAnswerId,
                });

                const data = response.data;
                const isCorrect = data.isCorrect;

                if (isCorrect) {
                    toast({
                        title: "Correct!",
                        variant: 'success',
                    });
                    setCorrectAnswers(prev => prev + 1);
                } else {
                    toast({
                        title: "Wrong!",
                        variant: 'destructive',
                    });
                    setWrongAnswers(prev => prev + 1);
                }

                if (questionIndex === game.questions.length - 1) {
                    setHasEnded(true);
                } else {
                    setQuestionIndex(prev => prev + 1);
                }

                setSelectedChoice(null);

            } catch (error) {
                console.error('Error checking answer:', error);
            } 
            finally {
                setShowLoader(false); // หยุดแสดง loader
            }
        }
    }, [selectedChoice, currentQuestion, options, toast]);


 




    if (hasEnded) {
        return (
            <div style={{ backgroundColor: '#003b2f', padding: '20px', position: 'relative', height: '100vh', width: '100vw' }}>
                <div className='absolute flex flex-col justify-center -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2'>
                    <div className='px-4 mt-2 font-semibold text-white bg-green-500 rounded-md whitespace-nowrap'>
                        You Completed in {'3min 4s'}
                    </div>
                    <Link href={`/statistics/${game.id}`}>
                        <div className='font-semibold text-white'>
                            View Statistics
                        </div>

                        <BarChart className='w-4 h-4 ml-2 ' />
                    </Link>
                </div>
            </div>
        );
    }





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

                        <div className='flex self-start mt-3 text-slate-400'>
                            <div>
                                <Timer className='mr-2' />


                            </div>
                        </div>




                    </div>
                    <QuizCount correctAnswers={correctAnswers} wrongAnswers={wrongAnswers} />
                </div>





                {/*แสดงคำถาม */}
                <Card className='w-full mt-4  bg-[#03fc9d]'>
                    <CardHeader className='flex flex-row items-center'>
                        <CardTitle className='mr-5 text-center divide-y divide-zinc-400'>
                            <div>{questionIndex + 1}</div>
                            <div className='text-sm text-slate-400'>
                                {game.questions.length}
                            </div>
                        </CardTitle>
                        <CardDescription>
                            <div className='text-xl font-semibold text-[#01a36b]'>
                                {currentQuestion.question}

                            </div>

                        </CardDescription>
                    </CardHeader>
                </Card>





                {/*แสดง ตัวเลือกคำตอบ*/}
                <div className='flex flex-col items-center justify-center w-full mt-4 '>
                    {options.map((option, index) => {

                        return (
                            <Button
                                key={index}
                                className={`justify-start w-full py-8 mb-4 ${selectedChoice === index ? 'bg-[#597c6e]' : 'bg-[#f2f2f2] text-black'}`}
                                onClick={() => {
                                    setSelectedChoice(index);
                                }}
                            >
                                <div className='flex items-center justify-start'>
                                    <div className='p-2 px-3 mr-5 border rounded-md'>
                                        {index + 1}
                                    </div>
                                    <div className='text-start'>{option.text}</div>
                                </div>
                            </Button>
                        )
                    })}

                    <Button className='mt-2  bg-[#03fc9d] text-green-900'

                        onClick={handleNext}
                    >
                        Next <ChevronRight className='w-4 h-5 ml-2' />
                    </Button>

                </div>

            </div>
        </div>
    )
}




export default QuizClient;