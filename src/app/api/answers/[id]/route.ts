import { prisma } from "@/utils/connect";
import { NextResponse } from "next/server";

export const DELETE = async (req: Request, { params }: { params: { id: string } }) => {
    const { id } = params;

    try {
        const deletedAnswer = await prisma.answer.delete({
            where: { id },
        });
        return NextResponse.json(deletedAnswer, { status: 200 });
    } catch (error) {
        console.error('Error deleting answer:', error);
        return NextResponse.json({ error: 'Failed to delete answer' }, { status: 500 });
    }
};

// UPDATE method
export const PUT = async (req: Request, { params }: { params: { id: string } }) => {
    const { id } = params;
    const { content_answer } = await req.json();

    try {
        const updatedAnswer = await prisma.answer.update({
            where: { id },
            data: { content_answer },
        });
        return NextResponse.json(updatedAnswer, { status: 200 });
    } catch (error) {
        console.error('Error updating answer:', error);
        return NextResponse.json({ error: 'Failed to update answer' }, { status: 500 });
    }
};