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