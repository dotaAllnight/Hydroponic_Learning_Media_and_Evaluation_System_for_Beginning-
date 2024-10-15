{/**'use client'
import { Button } from "@/components/ui/button";
import { useState } from "react";
import QuizBar from "@/components/quizBar";
import { Leaf, ArrowBigRight } from "lucide-react";


const questions = [
    // 1
    {
        questionText: "What is React",
        answers: [
            {
                answerText: "A libary for building user interfaces",
                isCorrect: true, id: 1
            },

            {
                answerText: "A front-end framework",
                isCorrect: false, id: 2
            },

            {
                answerText: "A back-end framework",
                isCorrect: false, id: 3
            },

            {
                answerText: "A Database",
                isCorrect: false, id: 4
            },

        ]
    },
    //2
    {
        questionText: "What is the virtual DOM",
        answers: [
            {
                answerText: "A virtual representation of the DOM",
                isCorrect: true, id: 1
            },

            {
                answerText: "A real Dom",
                isCorrect: false, id: 2
            },

            {
                answerText: "A virtual representation of the browser ",
                isCorrect: false, id: 3
            },

            {
                answerText: "A virtual representation of the server",
                isCorrect: false, id: 4
            },

        ]
    },
    //3
    {
        questionText: "What is JSX",
        answers: [
            {
                answerText: "JavaScript XML",
                isCorrect: true, id: 1
            },

            {
                answerText: "JavaScript",
                isCorrect: false, id: 2
            },

            {
                answerText: "JavaScript and XML",
                isCorrect: false, id: 3
            },

            {
                answerText: "JavaScript and HTML",
                isCorrect: false, id: 4
            },

        ]
    },

    {
        questionText: "What is JSX",
        answers: [
            {
                answerText: "JavaScript XML",
                isCorrect: true, id: 1
            },

            {
                answerText: "JavaScript",
                isCorrect: false, id: 2
            },

            {
                answerText: "JavaScript and XML",
                isCorrect: false, id: 3
            },

            {
                answerText: "JavaScript and HTML",
                isCorrect: false, id: 4
            },
        ]
    },
]



export default function Quiz() {

    const [started, setStarted] = useState<boolean>(false);
    const [currentQuestion, setCurrentQuestion] = useState<number>(0);
    const [score, setScore] = useState<number>(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

    const handleNext = () => {
        if (!started) {
            setStarted(true);
            return;
        }

        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        }
    }

    const handleAnswer = (answer) => {
        setSelectedAnswer(answer.id);
        const isCurrentCorrect = answer.isCorrect;
        if (isCurrentCorrect) {
            setScore(score + 1);
        }
        setIsCorrect(isCurrentCorrect);
    }
    return (
        <div className=" flex flex-col flex-1 w-full">
            <div className="position-sticky top-0 z-10 shadow-md py-4 w-full">
                <header
                    className="grid grid-cols-[auto,1fr,auto] grid-flow-col items-center justify-between py-2 gap-2">

                    <Button size="icon"
                        variant="outline" color="green"><Leaf /></Button>

                    <QuizBar value={
                        (currentQuestion / questions.length)
                        * 100} />

                    <Button size="icon"
                        variant="outline" color="green"><ArrowBigRight /></Button>

                </header>
            </div>
            <main className="flex justify-center flex-1">
                {!started ? <h1 className="text-6xl font-bold">
                    Welcome to the Quiz
                </h1> : (
                    <div>
                        <h2 className="text-3xl font-bold">
                            {questions[currentQuestion].questionText}
                        </h2>

                        <div className="grid grid-cols-1 gap-6 mt-6">
                            {
                                questions[currentQuestion].answers.map
                                    (answer => {
                                        return (
                                            <Button key={answer.id} onClick={() => handleAnswer(answer)}>
                                                {answer.answerText}
                                            </Button>
                                        )
                                    })
                            }
                        </div>
                    </div>
                )}
            </main>

            <footer
                className="footer pb-9 px-6 relative mb-0"
            >
                <p>{isCorrect ? 'correct' : 'incorrect'}</p>
            </footer>

            <Button onClick={handleNext}>{!started ? 'Start' : 'Next'}
            </Button>
        </div>
    )
} */}