'use client';

import React from 'react';
import { DoodleArrow, DoodleStar } from '@/components/Doodles';

export default function ResumeBar() {
  return (
    <div className="resume-bar-section" style={{ width: '100%', margin: '3rem 0' }}>
      <div className="resume-bar-card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', flexWrap: 'wrap' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(255, 107, 53, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', border: '1px solid var(--accent-orange)' }}>
            📄
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0 }}>OFFICIAL RESUME &amp; CV</h3>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', padding: '0.2rem 0.6rem', background: 'var(--accent-lime)', color: '#000', borderRadius: '100px', fontWeight: 700 }}>
                UPDATED 2026
              </span>
            </div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-secondary)', margin: '0.3rem 0 0 0' }}>
              B.Tech CSE &bull; Full-Stack &amp; IoT Systems &bull; Available for Internships &amp; Roles
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-gold)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
            <span>One-Click Download</span>
            <DoodleArrow direction="right" style={{ width: '35px', height: '18px', color: 'var(--accent-orange)' }} />
          </div>

          <a
            href="/RESUME_AryanShakya_01.pdf"
            target="_blank"
            rel="noopener noreferrer"
            download="RESUME_AryanShakya_01.pdf"
            className="resume-btn"
          >
            <span>DOWNLOAD PDF</span>
            <span style={{ fontSize: '1.1rem' }}>↓</span>
          </a>
        </div>
      </div>
    </div>
  );
}
