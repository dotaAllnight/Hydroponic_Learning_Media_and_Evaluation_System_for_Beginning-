import { getServerSession, NextAuthOptions, User, } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "./connect";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            email: string;
            name?: string;
            image?: string;
            role: string;
        };
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string;
        email: string;
        name?: string;
        role: string;
    }
}


export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: "jwt"
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
                const userFromDb = await prisma.user.findUnique({
                    where: {
                        email: user.email!, // ใช้อีเมลเพื่อตรวจสอบข้อมูลผู้ใช้
                    },
                    include: { role: true }, // ดึงข้อมูล role จากตาราง Role
                });


                if (userFromDb?.role?.roleName === "Admin") {
                    token.role = "Admin";
                } else if (userFromDb?.role?.roleName === "officer") {
                    token.role = "officer";
                } else {
                    token.role = "user";
                }
            }
            return token;
        },

        async session({ session, token }) {


            if (token) {
                session.user.role = token.role as string;
            }
            return session;
        },
    }
}
export const getAuthSession = () => getServerSession(authOptions);