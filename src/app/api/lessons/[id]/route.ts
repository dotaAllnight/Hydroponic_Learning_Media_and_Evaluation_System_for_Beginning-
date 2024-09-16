import { getAuthSession } from "@/utils/auth";
import { prisma } from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

//Get Show all Lesson
export const GET = async (req: NextRequest,
    { params }: { params: { id: string } }) => {

    const { id } = params;

    try {

        const lessons = await prisma.lessons.findUnique({
            where: {
                lessonId: id,
            },
        });
        return new NextResponse(
            JSON.stringify(lessons),
            { status: 200 }
        );

    } catch (err) {
        console.log(err)
        return new NextResponse(
            JSON.stringify({ message: "Something went wrong" }),
            { status: 500 }
        );
    }
};



//Get DELETE Lesson
export const DELETE = async (req: NextRequest,
    { params }: { params: { id: string } }) => {

    const { id } = params;
    const session = await getAuthSession()

    // 
    if (!session || session.user.role !== 'Admin') {
        return new NextResponse(
            JSON.stringify({ message: "You do not have permission to delete this lesson." }),
            { status: 403 } // Forbidden
        );
    }

    try {

        await prisma.lessons.delete({
            where: {
                lessonId: id,
            },
        });
        return new NextResponse(
            JSON.stringify("Lesson has been deleted! "),
            { status: 200 }
        );

    } catch (err) {
        console.log(err)
        return new NextResponse(
            JSON.stringify({ message: "Something went wrong" }),
            { status: 500 }
        );
    }
};
