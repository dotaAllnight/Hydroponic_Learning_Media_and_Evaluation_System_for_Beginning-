import { prisma } from "@/utils/connect";
import { NextResponse } from "next/server";

//API เพิ่ม Questionboard

export const POST = async (req: Request) => {
    try {
        const { topic, content, ownerId, img } = await req.json();

        if (!topic || !content || !ownerId) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const newQuestionboard = await prisma.questionborad.create({
            data: {
                topic,
                content,
                owner: {
                    connect: { id: ownerId },
                },
                img,
            },
        });

        return NextResponse.json(newQuestionboard, { status: 201 });

    } catch (error) {
        console.error('Error creating questionboard: ', error);
        return NextResponse.json({ error: 'Fail to Create Questionboard' }, { status: 201 })
    }
}