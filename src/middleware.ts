import { NextRequest, NextResponse } from 'next/server';
import { JWTVerifyResult, jwtVerify } from "jose";
import axios, { AxiosResponse } from 'axios';
 
let locales = ['pt', 'en'];
const JWT_TOKEN_KEY: any = process.env.JWT_TOKEN_KEY;

const protectedRoutes = /^(home|profile)/;
 
// Get the preferred locale, similar to above or using a library
function getLocale(request: NextRequest) { return locales[0]; }

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

function removeLanguagePrefix(pathname: string) {
    const languagePrefixes = locales;

    for (const prefix of languagePrefixes) {
        if (pathname.startsWith(`/${prefix}/`)) {
            return pathname.slice(prefix.length + 2);
        }
    }

    return pathname.slice(1);
}

function isPathnameMissingLocale(pathname: string): boolean {
    const pathnameIsMissingLocale = locales.every(
        (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    );

    return pathnameIsMissingLocale;
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
    // Check if there is any supported locale in the pathname
    const pathname = request.nextUrl.pathname

    if (isPathnameMissingLocale(pathname)) {
        const locale = getLocale(request)
        // e.g. incoming request is /products
        // The new URL is now /en-US/products
        return NextResponse.redirect(
            new URL(`/${locale}/${pathname}`, request.url)
        )
    }

    const languagePath = pathname.split('/')[1] ? `/${pathname.split('/')[1]}/` : '';
    const noI18Pathname = removeLanguagePrefix(pathname);

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
                new URL(`${languagePath}/login`, request.url)
            )
        }
    }
    else if (noI18Pathname.startsWith("login")) {
        if (await userSession(request)) {
            return NextResponse.redirect(
                new URL(`${languagePath}/home`, request.url)
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