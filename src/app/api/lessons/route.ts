
import { prisma } from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";


export const GET = async (req: Request) => {

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
};



export const POST = () => {
    return new NextResponse("Hello", { status: 200 });
};