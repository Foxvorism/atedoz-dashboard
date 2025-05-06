import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { access_token } = await req.json();

  if (!access_token) {
    return NextResponse.json({ error: 'Token is missing' }, { status: 400 });
  }

  // Simpan token di cookie
  const cookieStore = await cookies();
  cookieStore.set('token', access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 hari
  });

  return NextResponse.json({ message: 'Token set' });
}
