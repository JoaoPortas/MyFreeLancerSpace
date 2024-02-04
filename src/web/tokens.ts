import { cookies } from 'next/headers'

const JWT_TOKEN_KEY = process.env.JWT_TOKEN_KEY;

const cookieOptions = {
    httpOnly: true,
    maxAge: 2592000,
    path: "/",
    sameSite: "Strict",
    secure: process.env.NODE_ENV === "production"
};

export async function setCookie(name: string, value: string) {
    cookies().set({
        name: 'name',
        value: 'lee',
        httpOnly: true,
        path: '/',
        secure: false
      });
      console.log("fucking donut");
}

