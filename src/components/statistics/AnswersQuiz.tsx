import { Table, TableBody, TableCaption, TableCell, TableHeader, TableRow } from "../ui/table";


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
            <TableHeader>
                <TableRow>
                    <TableCell className="font-semibold text-white px-16 py-7">Question</TableCell>
                    <TableCell className="font-semibold text-white px-16 py-7 ">Your Answer</TableCell>
                    <TableCell className="font-semibold text-white px-16 py-7 flex justify-end">Correct Answer</TableCell>
                </TableRow>
            </TableHeader>
            <TableBody>
                {questions.map((question) => {
                    const userAnswerText = question.options.find(option => option.id === question.userAnswer)?.text || 'N/A';
                    const correctAnswerText = question.options.find(option => option.isCorrect)?.text || 'N/A';

                    return (
                        <TableRow key={question.id}>
                            <TableCell className="font-semibold text-white px-4 py-2 flex items-center">
                                {question.question}
                            </TableCell>
                            <TableCell className="font-semibold text-white px-4 py-2 min-h-[50px]">{userAnswerText}</TableCell>
                            <TableCell className="font-semibold text-white px-4 py-2 min-h-[50px]">{correctAnswerText}</TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>


    )
}

export default AnswersQuiz

{/* <Table className="mt-10">
            <TableCaption> End of list </TableCaption>
            <TableHeader>
                <TableRow>
                    <TableCell className="font-semibold text-white px-16 py-7"></TableCell>
                    <TableCell className="font-semibold text-white px-16 py-7 "></TableCell>
                    <TableCell className="font-semibold text-white px-16 py-7 flex justify-end"></TableCell>
                </TableRow>
            </TableHeader>
            <TableBody>
             

                    return (
                        <TableRow >
                            <TableCell className="font-semibold text-white px-4 py-2 flex items-center">
                                {question.question}
                            </TableCell>
                            <TableCell className="font-semibold text-white px-4 py-2 min-h-[50px]"></TableCell>
                            <TableCell className="font-semibold text-white px-4 py-2 min-h-[50px]"></TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table> */}