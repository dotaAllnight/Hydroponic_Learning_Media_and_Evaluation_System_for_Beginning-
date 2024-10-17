import { prisma } from '@/utils/connect'
import React from 'react'

type Props = {
    limit: number
    userId: string
}


const HistoryComponent = async ({ limit, userId }: Props) => {
    const games = await prisma.game.findMany({
        where: {
            userId,
        },
        take: limit,
        include: {
            questions: true, // เพื่อดึงคำถามมาคำนวณ accuracy
        },
    })

    return (
        <div className='space-y-8'>
            {games.map((game) => {

                const totalQuestions = game.questions.length
                const correctAnswers = game.questions.filter(
                    (q) => q.isCorrect === true
                ).length
                const accuracy = (correctAnswers / totalQuestions) * 100

                return (
                    <div key={game.id} className='bg-gray-800 p-4 rounded-lg'>
                        <h3 className='text-white text-lg font-bold'>{game.topic}</h3>
                        <p className='text-gray-400'>
                            Accuracy: {accuracy.toFixed(2)}%
                        </p>
                        <p className='text-gray-400'>

                        </p>

                        <p className='text-gray-400'>
                            Play at: {new Date().toLocaleString()} 
                        </p>

                    </div>
                )
            })}
        </div>
    )
}

export default HistoryComponent
