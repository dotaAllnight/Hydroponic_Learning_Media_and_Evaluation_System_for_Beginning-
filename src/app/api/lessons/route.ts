
import { prisma } from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

// Fetch all Lesson

export const GET = async (req: Request) => {
    const { searchParams } = new URL(req.url);
    const lessonTypeId = searchParams.get("typeId");

    try {
        const lessons = await prisma.lessons.findMany({
            where: {
                lessonTypeId: lessonTypeId ? lessonTypeId : undefined, // เปลี่ยนเป็น string
            },
            include: {
                lessonType: true,
            },
        });

        return NextResponse.json(lessons);
    } catch (error) {
        console.error("Error fetching lessons:", error);
        return NextResponse.json(
            { error: "Failed to fetch lessons." },
            { status: 500 }
        );
    }
};


/*export const GET = async (req: Request) => {

    const { searchParams } = new URL(req.url);
    const lessonTypeId = searchParams.get("typeId");

    try {

        const lessons = await prisma.lessons.findMany({
            where: {
                lessonTypeId: lessonTypeId || undefined,
            },
            include: {
                lessonType: true, //  lessonType
            },
        });

        return NextResponse.json(lessons);
    } catch (error) {
        console.error("Error fetching lessons:", error);
        return NextResponse.json(
            { error: "Failed to fetch lessons." },
            { status: 500 }
        );
    }
};*/







export const POST = async (req: NextRequest) => {
    try {
        const body = await req.json()

        const lessons = await prisma.lessons.create({
            data: body,
        });

        return new NextResponse(JSON.stringify(lessons), { status: 201 });
    } catch (error) {
        console.error("Error fetching lessons:", error);
        return NextResponse.json(
            { error: "Failed to fetch lessons." },
            { status: 500 }
        );
    }
};


export const PUT = async (req: Request) => {
    try {
        const body = await req.json();
        const { id, ...updateData } = body;

        if (!id) {
            return NextResponse.json({ error: "Lesson ID is required." }, { status: 400 });
        }

        const updatedLesson = await prisma.lessons.update({
            where: { lessonId: id },
            data: updateData,
        });

        return NextResponse.json(updatedLesson, { status: 200 });
    } catch (error) {
        console.error("Error updating lesson:", error);
        return NextResponse.json(
            { error: "Failed to update lesson." },
            { status: 500 }
        );
    }
};
