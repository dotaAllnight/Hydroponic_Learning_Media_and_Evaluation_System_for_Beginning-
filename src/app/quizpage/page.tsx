"use client";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldQuestion } from 'lucide-react';

import { redirect, useRouter } from 'next/navigation';
import React from 'react';

type Props = {
    limit: number
    userId: string
}


const QuizSelection = () => {

    const router = useRouter();



    return (
        <div style={{ backgroundColor: '#003b2f', padding: '20px', position: 'relative', height: '100vh', width: '100vw' }}>

            <div className='absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2'>
                <img src="/quizPic.svg" alt="Winners" className="mb-37" />
                <Card className='w-96 flex flex-col items-center'>
                    <CardHeader>
                        <CardTitle className='flex items-center text-2xl font-bold text-whiblackte'>
                        <ShieldQuestion className='w-8 h-8 mr-10' />
                        Quiz</CardTitle>
                    <CardDescription className='text-black bg-[#03fc9d] rounded-lg'>Topic: Basic Hydroponics</CardDescription>
                </CardHeader>
                <CardContent className='flex flex-col items-center justify-center'>
                    <p className='text-black mb-4'>
                        This is a multiple-choice quiz consisting of 10 questions.
                        Each question tests your knowledge on basic hydroponic principles and practices.
                    </p>
                    <Button
                        type="button"
                        onClick={() => router.push('/play/game01')}
                        className='mt-4 bg-[#03fc9d]'
                    >
                        <div className='font-semibold text-green-900'> Start Quiz</div>

                    </Button>
                </CardContent>
            </Card>


        </div>
        </div >
    );

};

export default QuizSelection;
