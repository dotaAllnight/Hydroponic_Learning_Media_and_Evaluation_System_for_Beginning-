import { prisma } from '@/utils/connect';
import { NextResponse } from 'next/server';

export const GET = async (req: Request, { params }: { params: { id: string } }) => {
    const { id } = params;

    try {
        const questionboard = await prisma.questionborad.findUnique({
            where: { id },
            include: {
                owner: true,
                answers: {
                    include: {
                        author: true,
                    },
                },
            },
        });
        return NextResponse.json(questionboard);
    } catch (error) {
        console.error("Error fetching questionboard:", error);
        return NextResponse.json(
            { error: "Failed to fetch question board." },
            { status: 500 }
        );
    }
};

export const DELETE = async (req: Request, { params }: { params: { id: string } }) => {
    const { id } = params;

    try {
        const deletedQuestionboard = await prisma.questionborad.delete({
            where: { id },
        });
        return NextResponse.json(deletedQuestionboard, { status: 200 });
    } catch (error) {
        console.error("Error deleting questionboard:", error);
        return NextResponse.json(
            { error: "Failed to delete question board." },
            { status: 500 }
        );
    }
};
