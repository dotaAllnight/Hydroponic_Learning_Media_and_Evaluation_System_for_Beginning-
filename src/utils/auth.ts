import { getServerSession, NextAuthOptions, User, } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "./connect";



declare module "next-auth" {
    interface Session {
        user: {
            id: string;       // เพิ่ม id
            email: string;
            name?: string;
            image?: string;
            role: string;     // เก็บข้อมูลบทบาท
        };
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string;        // เพิ่ม id
        email: string;
        name?: string;
        role: string;      // เก็บข้อมูลบทบาท
    }
}

// กำหนดการตั้งค่า NextAuth
export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: "jwt" // ใช้ JWT สำหรับการจัดการเซสชัน
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID!,
            clientSecret: process.env.GOOGLE_SECRET!,
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                // ตรวจสอบและดึงข้อมูลผู้ใช้จากฐานข้อมูล
                const userFromDb = await prisma.user.findUnique({
                    where: { email: user.email! },
                    include: { role: true },
                });

                // เพิ่มข้อมูลที่ต้องการลงใน token
                if (userFromDb) {
                    token.id = userFromDb.id; // เพิ่ม ID ของผู้ใช้
                    token.role = userFromDb.role?.roleName || "User"; // เพิ่มบทบาท
                }
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id; // เพิ่ม ID ในเซสชัน
                session.user.role = token.role as string; // เพิ่มบทบาทในเซสชัน
            }
            return session;
        },
    }

}

// ฟังก์ชันเพื่อดึงเซสชัน
export const getAuthSession = () => getServerSession(authOptions);
