// pages/api/userCounts.ts
import { prisma } from '@/utils/connect';
import { NextResponse } from 'next/server';

export const GET = async () => {
    try {
        const userCount = await prisma.user.count(); // นับจำนวนผู้ใช้ทั้งหมด

        return NextResponse.json({ count: userCount });
    } catch (error) {
        console.error("Error fetching user counts:", error);
        return NextResponse.json({ error: "Failed to fetch user counts." }, { status: 500 });
    }
};
