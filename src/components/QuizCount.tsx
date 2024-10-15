import { Apple, CheckCircle2, Leaf, XCircle } from "lucide-react";
import { Card } from "./ui/card";
import { Separator } from './ui/separator';

type Props = {
    correctAnswers: number;
    wrongAnswers: number;
};

const QuizCount = ({ correctAnswers, wrongAnswers }: Props) => {
    return (<Card className="flex flex-row items-center justify-center p-2">
        <Leaf color="green" size={20} />
        <span className="mx-2 text-xl text-[green]">{correctAnswers}</span>

        <Separator orientation="vertical" />
        <span className="mx-3 text-xl text-[red]">{wrongAnswers}</span>
        <Apple color="red" size={20} />
    </Card>
    )
}

export default QuizCount