'use client';

import Link from 'next/link';
import Navigation from '@/components/Navigation';
import NoiseOverlay from '@/components/NoiseOverlay';
import CustomCursor from '@/components/CustomCursor';

// Simple markdown-to-HTML converter for blog content
function renderMarkdown(content) {
  if (!content) return '';

  let html = content;

  // Code blocks
  html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, (_, lang, code) => {
    return `<pre><code class="language-${lang || 'text'}">${code.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>`;
  });

  // Inline code
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

  // Headers
  html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
  html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>');

  // Bold and italic
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');

  // Lists
  html = html.replace(/^- (.+)$/gm, '<li>$1</li>');
  html = html.replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>');

  // Paragraphs (lines not already tagged)
  html = html.replace(/^(?!<[hupol])(.+)$/gm, '<p>$1</p>');

  // Clean up empty paragraphs
  html = html.replace(/<p>\s*<\/p>/g, '');

  return html;
}

export default function BlogArticleClient({ blog, contact }) {
  return (
    <>
      <CustomCursor />
      <NoiseOverlay />
      <Navigation contact={contact} />

      <article className="blog-article">
        <Link href="/blog" className="blog-article-back">
          ← BACK TO BLOG
        </Link>

        <div className="blog-card-emoji" style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>
          {blog.coverEmoji}
        </div>

        <h1 className="blog-article-title">{blog.title}</h1>

        <div className="blog-article-meta">
          <span>By {blog.author}</span>
          <span>{new Date(blog.publishedAt).toLocaleDateString('en-IN', {
            year: 'numeric', month: 'long', day: 'numeric'
          })}</span>
          <span>{blog.category}</span>
        </div>

        <div className="blog-card-tags" style={{ marginBottom: '3rem' }}>
          {blog.tags.map((tag, i) => (
            <span key={i} className="blog-card-tag">{tag}</span>
          ))}
        </div>

        <div
          className="blog-article-content"
          dangerouslySetInnerHTML={{ __html: renderMarkdown(blog.content) }}
        />

        {/* JSON-LD for blog article */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BlogPosting',
              headline: blog.title,
              description: blog.excerpt,
              author: {
                '@type': 'Person',
                name: blog.author,
                url: 'https://www.aryanshakya.in',
              },
              datePublished: blog.publishedAt,
              keywords: blog.tags.join(', '),
              publisher: {
                '@type': 'Person',
                name: 'Aryan Shakya',
              },
            }),
          }}
        />
      </article>

      {/* Footer */}
      <footer className="section">
        <div className="section-inner">
          <div className="contact-footer">
            <Link href="/blog">← All Posts</Link>
            <Link href="/">Home</Link>
            <span>© {new Date().getFullYear()} Aryan Shakya</span>
          </div>
        </div>
      </footer>
    </>
  );
}
