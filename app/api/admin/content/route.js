import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { isAuthenticated } from '@/app/api/auth/route';
import { getFullDB, updateHero, updateAbout, updateSiteConfig, updateTheme } from '@/lib/db';

// GET — Fetch all content
export async function GET() {
  const cookieStore = await cookies();
  if (!isAuthenticated(cookieStore)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const db = getFullDB();
  return NextResponse.json(db);
}

// PUT — Update a section
export async function PUT(request) {
  const cookieStore = await cookies();
  if (!isAuthenticated(cookieStore)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { section, updates } = await request.json();

  try {
    switch (section) {
      case 'hero':
        updateHero(updates);
        break;
      case 'about':
        updateAbout(updates);
        break;
      case 'site':
        updateSiteConfig(updates);
        break;
      case 'theme':
        updateTheme(updates);
        break;
      default:
        return NextResponse.json({ error: 'Unknown section' }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save' }, { status: 500 });
  }
}
