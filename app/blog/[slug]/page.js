import { getBlogs, getBlogBySlug, getContact } from '@/lib/db';
import BlogArticleClient from './BlogArticleClient';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const blogs = getBlogs(true);
  return blogs.map(blog => ({ slug: blog.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);
  if (!blog) return {};

  return {
    title: blog.title,
    description: blog.excerpt,
    keywords: blog.tags,
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      type: 'article',
      publishedTime: blog.publishedAt,
      authors: [blog.author],
      tags: blog.tags,
    },
    twitter: {
      card: 'summary',
      title: blog.title,
      description: blog.excerpt,
    },
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);
  const contact = getContact();

  if (!blog) notFound();

  return <BlogArticleClient blog={blog} contact={contact} />;
}
