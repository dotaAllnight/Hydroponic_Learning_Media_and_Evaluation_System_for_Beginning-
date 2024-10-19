"use client"
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import UpdateQuizPage from '@/components/UpdateQuizPage';
export type QuizClientProps = {
    game: {
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
    } | null;
};

const UpdateQuizContainer = () => {
    const { id } = useParams();
    const [game, setGame] = useState<QuizClientProps['game'] | null>(null); // Explicitly type the state
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchGameData = async () => {
            try {
                const response = await fetch(`/api/games/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch game data');
                }
                const data = await response.json();
                setGame(data);
            } catch (error: any) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchGameData();
    }, [id]);

    if (loading) {
        return <div>Loading game data...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return <UpdateQuizPage game={game} />;
};

export default UpdateQuizContainer;