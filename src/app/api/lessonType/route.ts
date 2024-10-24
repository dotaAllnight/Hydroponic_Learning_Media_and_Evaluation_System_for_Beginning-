import { prisma } from "@/utils/connect";
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        const lessonTypes = await prisma.lessonType.findMany();
        return NextResponse.json(lessonTypes);
    } catch (error) {
        console.error("Error fetching lesson types:", error);
        return NextResponse.json(
            { error: "Failed to fetch lesson types." },
            { status: 500 }
        );
    }
};


// api > lessons > route.ts

export const PUT = async (req: Request) => {
    const { id, title, description, content, lessonTypeId } = await req.json();

    try {
        const updatedLesson = await prisma.lessons.update({
            where: { lessonId: id },
            data: {
                title,
                description,
                content,
                lessonTypeId, // Include lessonTypeId in the update
            },
        });

        return NextResponse.json(updatedLesson);
    } catch (error) {
        console.error("Error updating lesson:", error);
        return NextResponse.json(
            { error: "Failed to update lesson." },
            { status: 500 }
        );
    }
};
