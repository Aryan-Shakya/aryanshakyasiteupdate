'use client';

import Link from 'next/link';
import Navigation from '@/components/Navigation';
import NoiseOverlay from '@/components/NoiseOverlay';
import CustomCursor from '@/components/CustomCursor';
import { useState } from 'react';

export default function BlogPageClient({ blogs, contact }) {
  const [filter, setFilter] = useState('all');

  const categories = ['all', ...new Set(blogs.map(b => b.category))];
  const filtered = filter === 'all' ? blogs : blogs.filter(b => b.category === filter);

  return (
    <>
      <CustomCursor />
      <NoiseOverlay />
      <Navigation contact={contact} />

      <main style={{ paddingTop: 'calc(var(--nav-height) + 4rem)' }}>
        <div className="section-inner">
          <div className="section-label">[ BLOG ]</div>
          <h1 className="section-heading" style={{ marginBottom: '1rem' }}>
            THOUGHTS &<br /><em>ARTICLES</em>
          </h1>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '540px', marginBottom: '3rem', lineHeight: '1.8' }}>
            Writing about web development, IoT, creative coding, and the tools I use to build things.
          </p>

          {/* Category filter */}
          <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`admin-nav-btn ${filter === cat ? 'active' : ''}`}
                style={{ textTransform: 'capitalize' }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Blog grid */}
          <div className="blog-grid">
            {filtered.map(blog => (
              <Link key={blog.id} href={`/blog/${blog.slug}`} className="blog-card">
                <div className="blog-card-emoji">{blog.coverEmoji}</div>
                <div className="blog-card-category">{blog.category}</div>
                <h2 className="blog-card-title">{blog.title}</h2>
                <p className="blog-card-excerpt">{blog.excerpt}</p>
                <div className="blog-card-tags">
                  {blog.tags.map((tag, i) => (
                    <span key={i} className="blog-card-tag">{tag}</span>
                  ))}
                </div>
                <div className="blog-card-meta">
                  <span>{blog.author}</span>
                  <span>{new Date(blog.publishedAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                </div>
              </Link>
            ))}
          </div>

          {filtered.length === 0 && (
            <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '4rem 0', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
              No posts found in this category yet.
            </p>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="section">
        <div className="section-inner">
          <div className="contact-footer">
            <a href={contact.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a>
            <a href={contact.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
            <Link href="/">← Back to Home</Link>
            <span>© {new Date().getFullYear()} Aryan Shakya</span>
          </div>
        </div>
      </footer>
    </>
  );
}
