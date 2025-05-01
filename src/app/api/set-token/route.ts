// app/api/set-token/route.ts
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    const { token } = await req.json()

    if (!token) {
        return NextResponse.json({ error: 'Token is missing' }, { status: 400 })
    }

    const res = NextResponse.json({ message: 'Token set' })

    // Simpan token di cookie
    res.cookies.set("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/", // berlaku untuk semua route
        maxAge: 60 * 60 * 24 * 7, // 7 hari
    })

    return res
}
