import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { isAuthenticated } from '@/app/api/auth/route';
import { getBlogs, addBlog, updateBlog, deleteBlog } from '@/lib/db';

// GET — Fetch all blogs
export async function GET() {
  const blogs = getBlogs();
  return NextResponse.json(blogs);
}

// POST — Create new blog
export async function POST(request) {
  const cookieStore = await cookies();
  if (!isAuthenticated(cookieStore)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const blog = addBlog(body);
  return NextResponse.json(blog, { status: 201 });
}

// PUT — Update existing blog
export async function PUT(request) {
  const cookieStore = await cookies();
  if (!isAuthenticated(cookieStore)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id, ...updates } = await request.json();
  const blog = updateBlog(id, updates);
  if (!blog) {
    return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
  }
  return NextResponse.json(blog);
}

// DELETE — Delete blog
export async function DELETE(request) {
  const cookieStore = await cookies();
  if (!isAuthenticated(cookieStore)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await request.json();
  deleteBlog(id);
  return NextResponse.json({ success: true });
}
