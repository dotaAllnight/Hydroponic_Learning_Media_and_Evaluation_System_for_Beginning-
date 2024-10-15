import { prisma } from "@/utils/connect";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { questionId, userAnswer } = await request.json();

    const question = await prisma.question.findUnique({
        where: { id: questionId },
        include: { options: true },
    });

    if (!question){
        return NextResponse.json({ error: 'Question not found'}, { status: 404});
    }

    const isCorrect = question.options.some(option =>
        option.id === userAnswer && option.isCorrect
    );

    await prisma.question.update({
        where: { id: questionId },
        data: {
            userAnswer: userAnswer,
            isCorrect: isCorrect
        },
    });
    
    return NextResponse.json({ isCorrect});
}