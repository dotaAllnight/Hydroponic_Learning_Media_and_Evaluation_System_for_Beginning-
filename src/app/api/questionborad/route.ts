// pages/api/questionborad.ts

import { prisma } from '@/utils/connect';
import { NextResponse } from 'next/server';

export const GET = async (req: Request) => {
    try {
        const questionboards = await prisma.questionborad.findMany({
            include: {
                owner: true,
                answers: true,
            },
        });

        return NextResponse.json(questionboards);
    } catch (error) {
        console.error("Error fetching questionboards:", error);
        return NextResponse.json(
            { error: "Failed to fetch questionboards." },
            { status: 500 }
        );
    }
};
