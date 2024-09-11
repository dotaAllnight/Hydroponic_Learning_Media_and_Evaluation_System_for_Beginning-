import { prisma } from "@/utils/connect";
import { NextResponse } from "next/server";




export const GET = async () => {
    try {
        // Fetch categories from database
        const categories = await prisma.lessonType.findMany();

        // Close Prisma Client connection if necessary
        await prisma.$disconnect();

        // Return successful response
        return new NextResponse(
            JSON.stringify(categories),
            {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
    } catch (err) {
        console.error('Error fetching categories:', err);

        // Return error response
        return new NextResponse(
            JSON.stringify({ message: "Something went wrong!" }),
            {
                status: 500,
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
    }
}





export const POST = () => {
    return new NextResponse("Hello", { status: 200 });
};