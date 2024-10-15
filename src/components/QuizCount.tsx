import { CheckCircle2 } from "lucide-react";
import { Card } from "./ui/card";

type Props = {
    correctAnswers: number;
    wrongAnswers: number;
};

const QuizCount = ({correctAnswers, wrongAnswers} : Props) => {
    return(<Card className="flex flex-row items-center justify-center p-2">
        <CheckCircle2 color="green" size={30}/>
        <span className="mx-2 text-2xl text-[green]">{correctAnswers}</span>

        </Card>
    )
}