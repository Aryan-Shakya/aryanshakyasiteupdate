import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'data', 'db.json');

function readDB() {
  const raw = fs.readFileSync(DB_PATH, 'utf-8');
  return JSON.parse(raw);
}

function writeDB(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
}

// ── Site / SEO ──────────────────────────────────────
export function getSiteConfig() {
  return readDB().site;
}

export function updateSiteConfig(updates) {
  const db = readDB();
  db.site = { ...db.site, ...updates };
  writeDB(db);
  return db.site;
}

// ── Hero ────────────────────────────────────────────
export function getHero() {
  return readDB().hero;
}

export function updateHero(updates) {
  const db = readDB();
  db.hero = { ...db.hero, ...updates };
  writeDB(db);
  return db.hero;
}

// ── About ───────────────────────────────────────────
export function getAbout() {
  return readDB().about;
}

export function updateAbout(updates) {
  const db = readDB();
  db.about = { ...db.about, ...updates };
  writeDB(db);
  return db.about;
}

// ── Projects ────────────────────────────────────────
export function getProjects() {
  return readDB().projects;
}

export function updateProject(id, updates) {
  const db = readDB();
  const idx = db.projects.findIndex(p => p.id === id);
  if (idx === -1) return null;
  db.projects[idx] = { ...db.projects[idx], ...updates };
  writeDB(db);
  return db.projects[idx];
}

export function addProject(project) {
  const db = readDB();
  project.id = 'proj-' + (db.projects.length + 1);
  db.projects.push(project);
  writeDB(db);
  return project;
}

export function deleteProject(id) {
  const db = readDB();
  db.projects = db.projects.filter(p => p.id !== id);
  writeDB(db);
}

// ── Skills ──────────────────────────────────────────
export function getSkills() {
  return readDB().skills;
}

export function updateSkills(skills) {
  const db = readDB();
  db.skills = skills;
  writeDB(db);
  return db.skills;
}

// ── Experience ──────────────────────────────────────
export function getExperience() {
  return readDB().experience;
}

// ── Education ───────────────────────────────────────
export function getEducation() {
  return readDB().education;
}

// ── Contact ─────────────────────────────────────────
export function getContact() {
  return readDB().contact;
}

// ── Terminal ────────────────────────────────────────
export function getTerminalConfig() {
  return readDB().terminal;
}

// ── Theme ───────────────────────────────────────────
export function getTheme() {
  return readDB().theme;
}

export function updateTheme(updates) {
  const db = readDB();
  db.theme = { ...db.theme, ...updates };
  writeDB(db);
  return db.theme;
}

// ── Blogs ───────────────────────────────────────────
export function getBlogs(publishedOnly = false) {
  const db = readDB();
  if (publishedOnly) {
    return db.blogs.filter(b => b.published);
  }
  return db.blogs;
}

export function getBlogBySlug(slug) {
  const db = readDB();
  return db.blogs.find(b => b.slug === slug) || null;
}

export function addBlog(blog) {
  const db = readDB();
  blog.id = 'blog-' + (db.blogs.length + 1);
  blog.publishedAt = new Date().toISOString().split('T')[0];
  blog.author = 'Aryan Shakya';
  db.blogs.push(blog);
  writeDB(db);
  return blog;
}

export function updateBlog(id, updates) {
  const db = readDB();
  const idx = db.blogs.findIndex(b => b.id === id);
  if (idx === -1) return null;
  db.blogs[idx] = { ...db.blogs[idx], ...updates };
  writeDB(db);
  return db.blogs[idx];
}

export function deleteBlog(id) {
  const db = readDB();
  db.blogs = db.blogs.filter(b => b.id !== id);
  writeDB(db);
}

// ── Full DB (for admin) ─────────────────────────────
export function getFullDB() {
  return readDB();
}
