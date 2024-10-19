"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldQuestion } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

// ประเภทของข้อมูล Game ที่จะถูกดึงมา
type Game = {
    id: string;
    topic: string;
    timeStarted: Date;
    questions: {
        id: string;
        question: string;
        userAnswer: string | null;
        options: {
            id: string;
            text: string;
            isCorrect: boolean;
        }[];
    }[];
};

const UpdateQuizPage = () => {
    const [games, setGames] = useState<Game[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);




    // ดึงข้อมูลเกมทั้งหมดจาก API
    useEffect(() => {
        const fetchGames = async () => {
            try {
                const response = await fetch('/api/games');
                if (!response.ok) {
                    throw new Error('Failed to fetch games');
                }
                const data = await response.json();
                setGames(data);
            } catch (error: any) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchGames();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div style={{ backgroundColor: '#003b2f', padding: '20px', position: 'relative', height: '100vh', width: '100vw' }}>
            <div className='absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2'>
            
                <img src="/quizPic.svg" alt="Winners" className="mb-10" />
                <h1 className='text-white text-4xl mb-4'>Update Quiz Questions</h1>
                {games.map((game) => (
                    <Card key={game.id} className='w-96 mb-4 flex flex-col items-center'>
                        <CardHeader>
                            <CardTitle className='flex items-center text-2xl font-bold text-white'>
                                <ShieldQuestion className='w-8 h-8 mr-2' />
                                {game.topic}
                            </CardTitle>
                            <CardDescription className='text-black bg-[#03fc9d] rounded-lg'>
                                Topic: {game.topic}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className='flex flex-col items-center justify-center'>
                            <p className='text-black mb-4'>
                                You Can Update quiz here !
                            </p>
                            <Link href={`/updatequiz/${game.id}`}>
                                <div className='font-semibold text-green-900 cursor-pointer hover:underline'>
                                    Update QUIZ !
                                </div>
                            </Link>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default UpdateQuizPage;
