'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Navigation({ contact }) {
  const [menuOpen, setMenuOpen] = useState(false);

  function toggleMenu() {
    setMenuOpen(prev => !prev);
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <>
      <nav className="nav">
        <Link href="/" className="nav-logo">
          AS<span className="nav-logo-dot">.</span>
        </Link>
        <div className="nav-links">
          <Link href="/#about" className="nav-link">About</Link>
          <Link href="/#work" className="nav-link">Work</Link>
          <Link href="/#skills" className="nav-link">Skills</Link>
          <Link href="/blog" className="nav-link">Blog</Link>
          <Link href="/#contact" className="nav-link">Contact</Link>
          <button
            className={`nav-menu-btn ${menuOpen ? 'open' : ''}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
          </button>
        </div>
        {/* Mobile menu button - always visible on mobile */}
        <button
          className={`nav-menu-btn mobile-only ${menuOpen ? 'open' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
          style={{ display: 'none' }}
        >
          <span></span>
          <span></span>
        </button>
      </nav>

      {/* Fullscreen mobile menu */}
      <div className={`fullscreen-menu ${menuOpen ? 'open' : ''}`}>
        <div className="fm-inner">
          <nav className="fm-nav">
            <Link href="/" className="fm-link" onClick={closeMenu}>Home</Link>
            <Link href="/#about" className="fm-link" onClick={closeMenu}>About</Link>
            <Link href="/#work" className="fm-link" onClick={closeMenu}>Work</Link>
            <Link href="/#skills" className="fm-link" onClick={closeMenu}>Skills</Link>
            <Link href="/blog" className="fm-link" onClick={closeMenu}>Blog</Link>
            <Link href="/#contact" className="fm-link" onClick={closeMenu}>Contact</Link>
          </nav>
          <div className="fm-footer">
            {contact?.github && (
              <a href={contact.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a>
            )}
            {contact?.linkedin && (
              <a href={contact.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
            )}
            {contact?.instagram && (
              <a href={contact.instagram} target="_blank" rel="noopener noreferrer">Instagram ↗</a>
            )}
            {contact?.email && (
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
