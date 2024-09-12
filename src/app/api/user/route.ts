import { prisma } from "@/utils/connect";
import { NextResponse } from "next/server";
import { hash } from 'bcrypt';
import * as z from 'zod';


const userSchema = z
    .object({
        username: z.string().min(1, "Username is required").max(100),
        email: z.string().min(1, "Email is required").email("Invalid email"),
        password: z
            .string()
            .min(1, 'Password is required')
            .min(8, 'Password must have than 8 characters'),
    })


export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, username, password } = userSchema.parse(body);

        //check if email already exists
        const existingUserByEmail = await prisma.user.findUnique({
            where: { email: email }
        });
        if (existingUserByEmail) {
            return NextResponse.json({ user: null, message: " User with this email already exists" },
                { status: 490 }
            )
        }

        //check username
        const hashedPassword = await hash(password, 10);


        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
            }
        });

        const { password: newUserPassword, ...rest } = newUser;


        return NextResponse.json({ user: rest, message: "User created success" }
            , { status: 201 }
        );

    } catch (error) {

        return NextResponse.json({ umessage: "Something went wrong" }
            , { status: 201 }
        );

    }
}