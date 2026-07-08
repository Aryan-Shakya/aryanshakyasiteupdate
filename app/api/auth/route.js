import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'changeme123';
const SESSION_SECRET = process.env.SESSION_SECRET || 'default-secret';

function generateToken() {
  // Simple token using timestamp + secret hash
  const payload = `${ADMIN_USERNAME}:${Date.now()}:${SESSION_SECRET}`;
  return Buffer.from(payload).toString('base64');
}

export function isAuthenticated(cookieStore) {
  const token = cookieStore.get('admin_session');
  if (!token) return false;
  try {
    const decoded = Buffer.from(token.value, 'base64').toString('utf-8');
    return decoded.includes(ADMIN_USERNAME) && decoded.includes(SESSION_SECRET);
  } catch {
    return false;
  }
}

// POST — Login
export async function POST(request) {
  const { username, password } = await request.json();

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    const token = generateToken();
    const cookieStore = await cookies();
    cookieStore.set('admin_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/',
    });

    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
}

// DELETE — Logout
export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete('admin_session');
  return NextResponse.json({ success: true });
}
