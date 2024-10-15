import QuizClient from "@/components/QuizClient";
import { prisma } from "@/utils/connect";


const PlayQuizPage = async ({ params }: { params: { gameId: string } }) => {
    console.log("Game ID : ", params.gameId);

    const game = await prisma.game.findUnique({
        where: { id: params.gameId },
        include: { questions: { include: { options: true } } },
    });

    if (!game) {
        return <p>Game not found</p>
    }

    return (
            <QuizClient game={game} />
    );

}

export default PlayQuizPage