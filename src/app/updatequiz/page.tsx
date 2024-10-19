"use client"

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
        <div>
            <h1>Update Quiz Questions</h1>
            <ul>
                {games.map((game) => (
                    <li key={game.id} className="my-4">
                        {/* ลิงก์ไปยังหน้าของแต่ละเกมตาม id */}
                        <Link href={`/updatequiz/${game.id}`}>
                            <div className="text-blue-500 hover:underline">
                                Update Quiz for Topic: {game.topic}
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UpdateQuizPage;
