import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { NextRequest, NextResponse } from "next/server";
//import jwt from "jsonwebtoken";
import { SignJWT } from "jose";

const JWT_TOKEN_KEY: any = process.env.JWT_TOKEN_KEY;

let cookieOptions: Partial<ResponseCookie> = {
    httpOnly: true,
    path: "/",
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
};

export async function GET(req: NextRequest) {
    const userEmail: string | null = req.nextUrl.searchParams.get("email");
    const userId: string | null = req.nextUrl.searchParams.get("id");
    const isSession: boolean = req.nextUrl.searchParams.get("isSession") ? (req.nextUrl.searchParams.get("isSession") === 'true') ? true : false : false;

    /*const token = jwt.sign({ email: userEmail }, JWT_TOKEN_KEY, {
        expiresIn: "30d",
    });*/
    let tokenJWT: SignJWT = await new SignJWT({ email: userEmail, uid: userId })
                            .setProtectedHeader({ alg: 'HS256' });
    
    if (!isSession) {
        cookieOptions = {
            ...cookieOptions,
            maxAge: 2592000,
        }
                        
        tokenJWT.setExpirationTime("30d");
    }

    const token: string = await tokenJWT.sign(new TextEncoder().encode(JWT_TOKEN_KEY));

    const response = NextResponse.json(JSON.stringify({ status: 200, message: "Cookie created" }), {
        status: 200
    });

    response.cookies.set({
        name: "session",
        value: token,
        ...cookieOptions
    });

    return response;
}