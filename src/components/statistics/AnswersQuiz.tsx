import { Table, TableBody, TableCaption, TableCell, TableHead, TableRow } from "../ui/table";


type Question = {
    id: string;
    question: string;
    userAnswer?: string | null;
    isCorrect?: boolean | null;
    options: {
        id: string;
        text: string;
        isCorrect: boolean;
    }[];
};

type Props = {
    questions: Question[];
}

const AnswersQuiz = ({ questions }: Props) => {
    return (
        <Table className="mt-10">
            <TableCaption> End of list </TableCaption>
            <TableHead>
                <TableRow>
                    <TableCell className="font-semibold text-white">Question</TableCell>
                    <TableCell className="font-semibold text-white">Your Answer</TableCell>
                    <TableCell className="font-semibold text-white">Correct Answer</TableCell>
                </TableRow>

            </TableHead>
            <TableBody>
                {questions.map((question) => {
                    const userAnswerText = question.options.find(option => option.id === question.userAnswer)?.text || 'N/A';
                    const correctAnswerText = question.options.find(option => option.isCorrect)?.text || 'N/A;'

                    return (
                        <TableRow key={question.id}>
                            <TableCell className="font-semibold text-white">{question.question}</TableCell>
                            <TableCell className="font-semibold text-white">{userAnswerText}</TableCell>
                            <TableCell className="font-semibold text-white">{correctAnswerText}</TableCell>

                        </TableRow>
                    )

                })}
            </TableBody>

        </Table>
    )
}

export default AnswersQuiz