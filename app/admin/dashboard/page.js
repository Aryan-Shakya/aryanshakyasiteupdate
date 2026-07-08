'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminDashboard() {
  const [tab, setTab] = useState('home');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  // Blog editor state
  const [editingBlog, setEditingBlog] = useState(null);
  const [blogForm, setBlogForm] = useState({
    title: '', slug: '', excerpt: '', content: '', category: '', tags: '', coverEmoji: '📝', published: true
  });

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const res = await fetch('/api/admin/content');
      if (res.status === 401) {
        router.push('/admin');
        return;
      }
      const json = await res.json();
      setData(json);
      setLoading(false);
    } catch {
      router.push('/admin');
    }
  }

  async function saveSection(section, updates) {
    setSaving(true);
    setMessage('');
    try {
      const res = await fetch('/api/admin/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ section, updates }),
      });
      if (res.ok) {
        setMessage('✓ Saved successfully!');
        fetchData();
      } else {
        setMessage('✕ Failed to save.');
      }
    } catch {
      setMessage('✕ Network error.');
    }
    setSaving(false);
    setTimeout(() => setMessage(''), 3000);
  }

  async function saveBlog() {
    setSaving(true);
    setMessage('');
    const payload = {
      ...blogForm,
      tags: blogForm.tags.split(',').map(t => t.trim()).filter(Boolean),
    };

    try {
      const method = editingBlog ? 'PUT' : 'POST';
      const body = editingBlog ? { id: editingBlog, ...payload } : payload;
      const res = await fetch('/api/admin/blogs', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        setMessage('✓ Blog saved!');
        setEditingBlog(null);
        setBlogForm({ title: '', slug: '', excerpt: '', content: '', category: '', tags: '', coverEmoji: '📝', published: true });
        fetchData();
      } else {
        setMessage('✕ Failed to save blog.');
      }
    } catch {
      setMessage('✕ Network error.');
    }
    setSaving(false);
    setTimeout(() => setMessage(''), 3000);
  }

  async function deleteBlog(id) {
    if (!confirm('Are you sure you want to delete this blog post?')) return;
    try {
      await fetch('/api/admin/blogs', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      setMessage('✓ Blog deleted.');
      fetchData();
    } catch {
      setMessage('✕ Failed to delete.');
    }
    setTimeout(() => setMessage(''), 3000);
  }

  function startEditBlog(blog) {
    setEditingBlog(blog.id);
    setBlogForm({
      title: blog.title,
      slug: blog.slug,
      excerpt: blog.excerpt,
      content: blog.content,
      category: blog.category,
      tags: blog.tags.join(', '),
      coverEmoji: blog.coverEmoji || '📝',
      published: blog.published,
    });
    setTab('blogs');
  }

  async function handleLogout() {
    await fetch('/api/auth', { method: 'DELETE' });
    router.push('/admin');
  }

  if (loading) {
    return (
      <div className="admin-login-wrap">
        <p style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="admin-layout">
      <div className="admin-header">
        <div className="admin-title">
          🛠 Admin Dashboard
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link href="/" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            ← View Site
          </Link>
          <button onClick={handleLogout} className="admin-btn admin-btn-danger" style={{ fontSize: '0.75rem' }}>
            Logout
          </button>
        </div>
      </div>

      {message && (
        <div style={{
          padding: '0.8rem 1.2rem',
          borderRadius: '8px',
          background: message.includes('✓') ? 'rgba(34, 197, 94, 0.1)' : 'rgba(255, 95, 86, 0.1)',
          border: `1px solid ${message.includes('✓') ? 'rgba(34, 197, 94, 0.3)' : 'rgba(255, 95, 86, 0.3)'}`,
          fontFamily: 'var(--font-mono)',
          fontSize: '0.8rem',
          marginBottom: '1.5rem',
        }}>
          {message}
        </div>
      )}

      {/* Tab Navigation */}
      <div className="admin-nav" style={{ marginBottom: '2rem' }}>
        {['home', 'seo', 'blogs', 'theme'].map(t => (
          <button
            key={t}
            className={`admin-nav-btn ${tab === t ? 'active' : ''}`}
            onClick={() => setTab(t)}
            style={{ textTransform: 'capitalize' }}
          >
            {t === 'seo' ? 'SEO & Meta' : t}
          </button>
        ))}
      </div>

      {/* ══ HOME TAB ══ */}
      {tab === 'home' && data && (
        <>
          {/* Hero Editor */}
          <div className="admin-card">
            <div className="admin-card-title">🏠 Hero Section</div>
            <div className="admin-form-group">
              <label className="admin-label">Greeting Text</label>
              <input
                className="admin-input"
                value={data.hero.greeting}
                onChange={e => setData({ ...data, hero: { ...data.hero, greeting: e.target.value } })}
              />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Tagline</label>
              <input
                className="admin-input"
                value={data.hero.tagline}
                onChange={e => setData({ ...data, hero: { ...data.hero, tagline: e.target.value } })}
              />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Description</label>
              <textarea
                className="admin-textarea"
                value={data.hero.description}
                onChange={e => setData({ ...data, hero: { ...data.hero, description: e.target.value } })}
              />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">CTA Button Text</label>
              <input
                className="admin-input"
                value={data.hero.cta}
                onChange={e => setData({ ...data, hero: { ...data.hero, cta: e.target.value } })}
              />
            </div>
            <div className="admin-form-group">
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={data.hero.available}
                  onChange={e => setData({ ...data, hero: { ...data.hero, available: e.target.checked } })}
                />
                <span className="admin-label" style={{ marginBottom: 0 }}>Available for Work</span>
              </label>
            </div>
            <button className="admin-btn admin-btn-primary" onClick={() => saveSection('hero', data.hero)} disabled={saving}>
              {saving ? 'Saving...' : 'Save Hero'}
            </button>
          </div>

          {/* About Editor */}
          <div className="admin-card">
            <div className="admin-card-title">📝 About Section</div>
            <div className="admin-form-group">
              <label className="admin-label">Description</label>
              <textarea
                className="admin-textarea"
                value={data.about.description}
                onChange={e => setData({ ...data, about: { ...data.about, description: e.target.value } })}
              />
            </div>
            <button className="admin-btn admin-btn-primary" onClick={() => saveSection('about', data.about)} disabled={saving}>
              {saving ? 'Saving...' : 'Save About'}
            </button>
          </div>
        </>
      )}

      {/* ══ SEO TAB ══ */}
      {tab === 'seo' && data && (
        <div className="admin-card">
          <div className="admin-card-title">🔍 SEO & Meta Tags</div>
          <div className="admin-form-group">
            <label className="admin-label">Site Title</label>
            <input
              className="admin-input"
              value={data.site.title}
              onChange={e => setData({ ...data, site: { ...data.site, title: e.target.value } })}
            />
          </div>
          <div className="admin-form-group">
            <label className="admin-label">Meta Description</label>
            <textarea
              className="admin-textarea"
              value={data.site.description}
              onChange={e => setData({ ...data, site: { ...data.site, description: e.target.value } })}
              style={{ minHeight: '80px' }}
            />
          </div>
          <div className="admin-form-group">
            <label className="admin-label">Keywords (comma-separated)</label>
            <input
              className="admin-input"
              value={data.site.keywords?.join(', ') || ''}
              onChange={e => setData({ ...data, site: { ...data.site, keywords: e.target.value.split(',').map(k => k.trim()) } })}
            />
          </div>
          <div className="admin-form-group">
            <label className="admin-label">OG Image Path</label>
            <input
              className="admin-input"
              value={data.site.ogImage}
              onChange={e => setData({ ...data, site: { ...data.site, ogImage: e.target.value } })}
            />
          </div>
          <button className="admin-btn admin-btn-primary" onClick={() => saveSection('site', data.site)} disabled={saving}>
            {saving ? 'Saving...' : 'Save SEO Settings'}
          </button>
        </div>
      )}

      {/* ══ BLOGS TAB ══ */}
      {tab === 'blogs' && data && (
        <>
          {/* Blog Editor */}
          <div className="admin-card">
            <div className="admin-card-title">
              ✏️ {editingBlog ? 'Edit Blog Post' : 'New Blog Post'}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="admin-form-group">
                <label className="admin-label">Title</label>
                <input
                  className="admin-input"
                  value={blogForm.title}
                  onChange={e => setBlogForm({ ...blogForm, title: e.target.value })}
                  placeholder="Post title"
                />
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Slug</label>
                <input
                  className="admin-input"
                  value={blogForm.slug}
                  onChange={e => setBlogForm({ ...blogForm, slug: e.target.value })}
                  placeholder="url-friendly-slug"
                />
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
              <div className="admin-form-group">
                <label className="admin-label">Category</label>
                <input
                  className="admin-input"
                  value={blogForm.category}
                  onChange={e => setBlogForm({ ...blogForm, category: e.target.value })}
                  placeholder="e.g., Web Dev"
                />
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Tags (comma-separated)</label>
                <input
                  className="admin-input"
                  value={blogForm.tags}
                  onChange={e => setBlogForm({ ...blogForm, tags: e.target.value })}
                  placeholder="React, Next.js, IoT"
                />
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Cover Emoji</label>
                <input
                  className="admin-input"
                  value={blogForm.coverEmoji}
                  onChange={e => setBlogForm({ ...blogForm, coverEmoji: e.target.value })}
                />
              </div>
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Excerpt</label>
              <textarea
                className="admin-textarea"
                value={blogForm.excerpt}
                onChange={e => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                placeholder="A short summary of the post..."
                style={{ minHeight: '80px' }}
              />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Content (Markdown)</label>
              <textarea
                className="admin-textarea"
                value={blogForm.content}
                onChange={e => setBlogForm({ ...blogForm, content: e.target.value })}
                placeholder="Write your blog post in Markdown..."
                style={{ minHeight: '300px', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={blogForm.published}
                  onChange={e => setBlogForm({ ...blogForm, published: e.target.checked })}
                />
                <span className="admin-label" style={{ marginBottom: 0 }}>Published</span>
              </label>
              <button className="admin-btn admin-btn-primary" onClick={saveBlog} disabled={saving}>
                {saving ? 'Saving...' : (editingBlog ? 'Update Post' : 'Publish Post')}
              </button>
              {editingBlog && (
                <button
                  className="admin-btn admin-btn-secondary"
                  onClick={() => {
                    setEditingBlog(null);
                    setBlogForm({ title: '', slug: '', excerpt: '', content: '', category: '', tags: '', coverEmoji: '📝', published: true });
                  }}
                >
                  Cancel
                </button>
              )}
            </div>
          </div>

          {/* Existing Blog Posts */}
          <div className="admin-card">
            <div className="admin-card-title">📚 All Blog Posts ({data.blogs?.length || 0})</div>
            {data.blogs?.map(blog => (
              <div
                key={blog.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '1rem 0',
                  borderBottom: '1px solid var(--border-subtle)',
                }}
              >
                <div>
                  <div style={{ fontWeight: 600, marginBottom: '0.3rem' }}>
                    {blog.coverEmoji} {blog.title}
                    {!blog.published && (
                      <span style={{ fontSize: '0.65rem', color: 'var(--accent-gold)', marginLeft: '0.5rem', fontFamily: 'var(--font-mono)' }}>
                        DRAFT
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                    /{blog.slug} · {blog.category} · {blog.publishedAt}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button className="admin-btn admin-btn-secondary" onClick={() => startEditBlog(blog)} style={{ fontSize: '0.7rem' }}>
                    Edit
                  </button>
                  <button className="admin-btn admin-btn-danger" onClick={() => deleteBlog(blog.id)} style={{ fontSize: '0.7rem' }}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* ══ THEME TAB ══ */}
      {tab === 'theme' && data && (
        <div className="admin-card">
          <div className="admin-card-title">🎨 Theme Settings</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {Object.entries(data.theme).filter(([key]) => key !== 'mode').map(([key, value]) => (
              <div className="admin-form-group" key={key}>
                <label className="admin-label">{key.replace(/([A-Z])/g, ' $1')}</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                  <input
                    type="color"
                    value={value}
                    onChange={e => setData({ ...data, theme: { ...data.theme, [key]: e.target.value } })}
                    style={{ width: '40px', height: '40px', border: 'none', borderRadius: '8px', cursor: 'pointer', background: 'none' }}
                  />
                  <input
                    className="admin-input"
                    value={value}
                    onChange={e => setData({ ...data, theme: { ...data.theme, [key]: e.target.value } })}
                  />
                </div>
              </div>
            ))}
          </div>
          <button className="admin-btn admin-btn-primary" onClick={() => saveSection('theme', data.theme)} disabled={saving} style={{ marginTop: '1rem' }}>
            {saving ? 'Saving...' : 'Save Theme'}
          </button>
        </div>
      )}
    </div>
  );
}
