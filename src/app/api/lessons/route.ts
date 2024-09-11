import { prisma } from "@/utils/connect";
import { NextResponse } from "next/server";



export const GET = async (req: Request) => {
    // ใช้ searchParams เพื่อดึงค่าจาก URL
    const { searchParams } = new URL(req.url);
    const lessonTypeId = searchParams.get("typeId"); // ดึงค่า typeId จาก URL

    try {
        // ค้นหาบทเรียนโดยใช้ where เพื่อกรองตาม lessonTypeId
        const lessons = await prisma.lessons.findMany({
            where: {
                lessonTypeId: lessonTypeId || undefined, // ถ้าไม่มี lessonTypeId จะไม่ใช้เงื่อนไข where
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