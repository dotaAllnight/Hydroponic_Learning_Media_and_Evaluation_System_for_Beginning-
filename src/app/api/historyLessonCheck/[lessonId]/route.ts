import { getAuthSession } from "@/utils/auth";
import { prisma } from "@/utils/connect";
import { NextResponse } from "next/server";


export const GET = async (req: Request, { params }: { params: { lessonId: string } }) => {
    const { lessonId } = params;

    try {
        const session = await getAuthSession();
        if (!session || !session.user || !session.user.id) {
            return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
        }

        const userId = session.user.id;

        // ตรวจสอบสถานะการทำบทเรียนเสร็จ
        const history = await prisma.historyLesson.findFirst({
            where: {
                userId: userId,
                lessonId: lessonId,
            },
        });

        return NextResponse.json({ completed: !!history }, { status: 200 });
    } catch (error) {
        console.error("Error checking lesson status:", error);
        return NextResponse.json(
            { error: "Failed to check lesson status",  },
            { status: 500 }
        );
    }
};