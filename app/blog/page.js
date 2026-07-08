import { getBlogs, getContact } from '@/lib/db';
import BlogPageClient from './BlogPageClient';

export const metadata = {
  title: 'Blog',
  description: 'Read articles about web development, IoT, Three.js, and creative coding by Aryan Shakya.',
  openGraph: {
    title: 'Blog | Aryan Shakya',
    description: 'Read articles about web development, IoT, Three.js, and creative coding.',
  },
};

export default function BlogPage() {
  const blogs = getBlogs(true);
  const contact = getContact();

  return <BlogPageClient blogs={blogs} contact={contact} />;
}
