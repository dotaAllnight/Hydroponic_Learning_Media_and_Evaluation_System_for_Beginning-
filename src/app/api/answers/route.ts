import { prisma } from '@/utils/connect';
import { NextResponse } from 'next/server';

export const POST = async (req: Request) => {
    const { content_answer, questiosnboradId, authorId } = await req.json();

    if (!content_answer || !questiosnboradId || !authorId) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    try {
        const answer = await prisma.answer.create({
            data: {
                content_answer,
                questiosnborad: {
                    connect: { id: questiosnboradId },
                },
                author: {
                    connect: { id: authorId },
                },
            },
        });
        return NextResponse.json(answer, { status: 201 });
    } catch (error) {
        console.error('Error creating answer:', error);
        return NextResponse.json({ error: 'Failed to create answer' }, { status: 500 });
    }
};



