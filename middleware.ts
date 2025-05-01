// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const token = request.cookies.get("token")?.value

    const isAuth = !!token
    const isLoginPage = request.nextUrl.pathname.startsWith("/login")

    // Jika belum login dan buka halaman yang bukan login
    if (!isAuth && !isLoginPage) {
        return NextResponse.redirect(new URL("/login", request.url))
    }

    // Jika sudah login dan coba buka halaman login, redirect ke dashboard
    if (isAuth && isLoginPage) {
        return NextResponse.redirect(new URL("/dashboard", request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ["/dashboard/:path*", "/login"],
}

