import { prisma } from "@/utils/connect";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const gameId = searchParams.get('gameId');

    if (gameId) {
        // ดึงข้อมูลเกมเฉพาะเกมที่ตรงกับ gameId
        const game = await prisma.game.findUnique({
            where: { id: gameId },
            include: {
                questions: {
                    include: {
                        options: true,
                    },
                },
            },
        });

        if (!game) {
            return new Response(JSON.stringify({ message: 'Game not found' }), { status: 404 });
        }

        return new Response(JSON.stringify(game), { status: 200 });
    } else {
        // ดึงข้อมูลเกมทั้งหมด
        const games = await prisma.game.findMany({
            include: {
                questions: {
                    include: {
                        options: true,
                    },
                },
            },
        });
        return new Response(JSON.stringify(games), { status: 200 });
    }
}
export async function POST(req: Request) {
    const { topic, questions, userId } = await req.json();  // รับ userId มาจาก request

    try {
        const newGame = await prisma.game.create({
            data: {
                topic,
                timeStarted: new Date(), // ใส่ค่าเวลาเริ่มต้นเป็นปัจจุบัน
                userId, // ต้องได้รับ userId มาจาก request
                questions: {
                    create: questions.map((q: any) => ({
                        question: q.question,
                        options: {
                            create: q.options.map((o: any) => ({
                                text: o.text,
                                isCorrect: o.isCorrect,
                            })),
                        },
                    })),
                },
            },
        });

        return new Response(JSON.stringify(newGame), { status: 201 });
    } catch (error) {
        console.error("Error creating game:", error);
        return new Response(JSON.stringify({ error: 'Failed to create game' }), { status: 500 });
    }
}
