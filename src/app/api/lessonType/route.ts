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