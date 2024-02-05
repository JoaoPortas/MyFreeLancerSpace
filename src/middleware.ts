import { NextRequest, NextResponse } from 'next/server';
import { JWTVerifyResult, jwtVerify } from "jose";

const JWT_TOKEN_KEY: any = process.env.JWT_TOKEN_KEY;

const protectedRoutes = /^(\/home|\/profile|\/products)/;

async function userSession(request: NextRequest): Promise<JWTVerifyResult | null> {
    const token: string | undefined = request.cookies.get("session")?.value;

    if (token) {
        try {
            const verified = await jwtVerify(token, new TextEncoder().encode(JWT_TOKEN_KEY));

            return verified;
        }
        catch (exeption) {
            return null;
        }
    }
    else {
        return null;
    }
}

async function isUserSessionTokenValid(userSessionData: JWTVerifyResult): Promise<boolean> {
    const userData = await fetch(`${process.env.API_BASE_URL}api/users/${userSessionData.payload.email}`)
    .then(function (res) {
        if (res?.status === 200) {
            return res.json();
        }
        else {
            return null;
        }
    });

    if (userData !== null) {
        return true;
    }
    else {
        return false;
    }
}

export async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    const noI18Pathname = pathname;

    if (protectedRoutes.test(noI18Pathname)) {
        const userSessionData = await userSession(request);

        if (userSessionData) {
            if (await isUserSessionTokenValid(userSessionData) === false) {
                return NextResponse.json({ message: 'Auth required' }, { status: 401 });
            }
        }
        else {
            //console.log("Forbiden");
            return NextResponse.redirect(
                new URL(`/login`, request.url)
            )
        }
    }
    else if (noI18Pathname.startsWith("/login")) {
        if (await userSession(request)) {
            return NextResponse.redirect(
                new URL(`/home`, request.url)
            )
        }
    }
}

export const config = {
    matcher: [
        // Skip all internal paths (_next)
        '/((?!_next|static|api|favicon.ico).*)'
        // Optional: only run on root (/) URL
        // '/'
    ],
}