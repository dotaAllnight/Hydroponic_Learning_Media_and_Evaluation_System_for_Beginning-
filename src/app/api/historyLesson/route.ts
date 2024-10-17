import { getAuthSession } from "@/utils/auth";
import { prisma } from "@/utils/connect";
import { NextResponse } from "next/server";



export const POST = async (req: Request) => {

    try {
        const session = await getAuthSession();
        console.log("Session:", session);

        if (!session || !session.user || !session.user.id) {
            return new NextResponse(JSON.stringify({ error: "User ID is required" }), { status: 401 });
        }

        const userId = session.user.id;
        console.log("User ID:", userId); // ตรวจสอบ userId

        const { lessonId } = await req.json(); // ดึง lessonId จากคำขอ

        // ตรวจสอบว่า lessonId มีค่าหรือไม่
        if (!lessonId) {
            return new NextResponse(JSON.stringify({ error: "Lesson ID is required" }), { status: 400 });
        }

        const newHistory = await prisma.historyLesson.create({
            data: {
                userId: userId,       // ใช้ userId ที่ได้จากเซสชัน
                lessonId: lessonId,   // ใช้ lessonId ที่ได้จากคำขอ
                learnDate: new Date(), // วันที่เรียน (อาจจะเก็บวันที่ในฟิลด์ learnDate)
            },
        });

        return new NextResponse(JSON.stringify({ message: "Lesson completed successfully", history: newHistory }), { status: 201 });
    } catch (error) {
        console.error("Error creating history lesson:", error);
        return NextResponse.json(
            { error: "Failed to create history lesson.", details: error instanceof Error ? error.message : "Unknown error" },
            { status: 500 }
        );
    }
}


export const GET = async (req: Request) => {
    try {
        const session = await getAuthSession();

        
        if (!session || !session.user || !session.user.id) {
            return new NextResponse(JSON.stringify({ error: "User not authenticated" }), { status: 401 });
        }

        const userId = session.user.id;

       
        const historyLessons = await prisma.historyLesson.findMany({
            where: { userId }, // ดึงเฉพาะประวัติการเรียนของผู้ใช้ที่กำลังเข้าสู่ระบบ
            include: {
                lesson: true, 
            },
            orderBy: {
                learnDate: 'desc', 
            },
        });

        return new NextResponse(JSON.stringify({ historyLessons }), { status: 200 });
    } catch (error) {
        console.error("Error fetching history lessons:", error);
        return NextResponse.json(
            { error: "Failed to fetch history lessons.", details: error instanceof Error ? error.message : "Unknown error" },
            { status: 500 }
        );
    }
};



