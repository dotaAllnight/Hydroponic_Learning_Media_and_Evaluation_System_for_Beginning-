import { prisma } from "@/utils/connect";

export async function GET(req: Request, { params }: { params: { id: string } }) {
    const { id } = params; // Get id from params

    const game = await prisma.game.findUnique({
        where: { id },
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
}




export async function PUT(req: Request, { params }: { params: { id: string } }) {
    const { id } = params;
    const { question, options } = await req.json();

    try {
        const updatedQuestion = await prisma.question.update({
            where: { id },
            data: {
                question,
                options: {
                    updateMany: options.map((opt: any) => ({
                        where: { id: opt.id },
                        data: {
                            text: opt.text,
                            isCorrect: opt.isCorrect,
                        },
                    })),
                },
            },
        });

        return new Response(JSON.stringify(updatedQuestion), { status: 200 });
    } catch (error) {
        console.error('Error updating question:', error);
        return new Response(JSON.stringify({ error: 'Failed to update question' }), { status: 500 });
    }
}
