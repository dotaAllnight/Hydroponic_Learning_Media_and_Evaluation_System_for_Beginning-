import AccuracyCard from "@/components/statistics/AccuracyCard"
import { buttonVariants } from "@/components/ui/button"
import { getAuthSession } from "@/utils/auth"
import { prisma } from "@/utils/connect"
import { BookAudioIcon, MessageSquareReplyIcon } from "lucide-react"
import Link from "next/link"
import { redirect } from "next/navigation"


type Props = {
    params: {
        gameId: string
    }
}

const StatisticsPage = async ({ params: { gameId } }: Props) => {
    const session = await getAuthSession();
    if (!session?.user) {
        return redirect("/login");
    }

    const game = await prisma.game.findUnique({
        where: { id: gameId },
        include: {
            questions: {
                include: {
                    options: true,
                },
            },
        },
    });


    if (!game) {
        return redirect("/quizpage");
    }

    let accuracy: number = 0
    if (game && game.questions.length > 0) {
        let totalCorrect = game.questions.reduce((acc, question) => {
            if (question.isCorrect) {
                return acc + 1
            }

            return acc;
        }, 0);
        accuracy = (totalCorrect / game.questions.length) * 100
    }

    return (
        <>
            <div className="p-8 mx-auto max-w-7xl">
                <div className="flex items-center justify-between space-y-2">
                    <h2 className="text-3xl font-bold tracking-tight"> Statistics</h2>
                    <div className="flex items-center space-x-2">
                        <Link href='/menu' className={buttonVariants()}>
                            <BookAudioIcon className="mr-2" />
                            Back to Lesson menu
                        </Link>


                        <Link href='/quizpage' className={buttonVariants()}>
                            <MessageSquareReplyIcon className="mr-2" />
                            Perform Quiz again
                        </Link>


                    </div>
                </div>

                <div className="grid gap-4 mt-4 md:grid-cols-7">
                    {/*ResultsCard */}
                    <AccuracyCard accuracy={accuracy} />


                </div>

                {/*QUestionList */}

            </div>
        </>
    )


}

export default StatisticsPage