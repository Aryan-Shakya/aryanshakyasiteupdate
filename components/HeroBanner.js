'use client';

import React from 'react';
import Robot3D from '@/components/Robot3D';
import { ComicBadge, DoodleStar, DoodleSparkle } from '@/components/Doodles';

export default function HeroBanner({ hero }) {
  return (
    <div className="hero-banner-section" style={{ position: 'relative', width: '100%' }}>
      {/* Anime Widescreen Banner Container */}
      <div className="anime-banner-wrap halftone-bg">
        {/* We use a styled fallback visual container until the user drops their Google Flow image into /images/anime-banner.png */}
        <div
          className="anime-banner-placeholder"
          style={{
            width: '100%',
            aspectRatio: '16 / 9',
            background: 'linear-gradient(135deg, #FFFDF9 0%, #FFF5E1 40%, #E8F5E9 80%, #E0F7FA 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
            borderBottom: '2px solid var(--border-light)',
          }}
        >
          {/* Animated background glowing spheres */}
          <div style={{ position: 'absolute', top: '-20%', left: '10%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(230, 57, 70, 0.15) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(40px)' }} />
          <div style={{ position: 'absolute', bottom: '-20%', right: '15%', width: '450px', height: '450px', background: 'radial-gradient(circle, rgba(42, 157, 143, 0.15) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(50px)' }} />
          
          {/* Google Flow Anime Banner */}
          <img
            src="/images/Copy_of_Young_Indian_male_202607060002.jpeg"
            alt="Aryan Shakya Anime Banner"
            className="anime-banner-img"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center center', zIndex: 2 }}
          />

          <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '2rem', maxWidth: '700px' }}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <ComicBadge text="CREATIVE TECH '26" color="var(--accent-rose)" textColor="#fff" />
              <ComicBadge text="AI & IOT CORE" color="var(--accent-lime)" textColor="#000" />
            </div>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 3.2rem)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: '0.8rem', color: '#1A1816' }}>
              BUILDING DIGITAL REALITIES
            </h2>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--accent-teal)', letterSpacing: '0.05em', fontWeight: 700 }}>
              [ GOOGLE FLOW ANIME BANNER: Copy_of_Young_Indian_male_202607060002.jpeg ]
            </p>
          </div>
        </div>

        {/* Banner Title Overlay */}
        <div className="anime-banner-overlay">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#000', background: 'rgba(255, 255, 255, 0.9)', padding: '0.4rem 0.8rem', borderRadius: '6px', border: '2px solid var(--accent-teal)', fontWeight: 700 }}>
              ⚡ ARYAN SHAKYA — STORYTELLING V3.0
            </span>
            <DoodleSparkle />
            <DoodleStar size={24} color="var(--accent-gold)" />
          </div>
        </div>
      </div>

      {/* 3D Tech Robot Element & Short Intro */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', alignItems: 'center', margin: '3rem 0' }}>
        <div>
          <div className="section-label" style={{ color: 'var(--accent-rose)', fontWeight: 800 }}>[ 01 — THE TECH PROTAGONIST ]</div>
          <h2 className="section-heading" style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', marginBottom: '1.2rem', color: 'var(--text-primary)' }}>
            WHERE CODE<br />MEETS <em style={{ color: 'var(--accent-teal)' }}>ROBOTICS</em>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '1.5rem', fontWeight: 500 }}>
            {hero?.description || "Full-stack developer, creative coder, and IoT engineer. Founder of Votiv Labs. When I'm not configuring microcontrollers or designing 3D web experiences, I'm exploring new realms in creative AI, photography, and music."}
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <div style={{ padding: '0.8rem 1.2rem', background: 'rgba(255, 0, 85, 0.1)', borderLeft: '4px solid var(--accent-rose)', borderRadius: '4px' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent-rose)', fontWeight: 700 }}>CURRENT FOCUS</div>
              <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)' }}>AI Robotics & Next.js Systems</div>
            </div>
            <div style={{ padding: '0.8rem 1.2rem', background: 'rgba(6, 182, 212, 0.1)', borderLeft: '4px solid var(--accent-teal)', borderRadius: '4px' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent-teal)', fontWeight: 700 }}>EDUCATION</div>
              <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)' }}>B.Tech CSE &bull; Class of &apos;28</div>
            </div>
            <a
              href="https://www.votivlabs.in"
              target="_blank"
              rel="noopener noreferrer"
              style={{ padding: '0.8rem 1.2rem', background: 'rgba(0, 240, 255, 0.1)', borderLeft: '4px solid var(--accent-cyan)', borderRadius: '4px', textDecoration: 'none', border: '1px solid rgba(0, 240, 255, 0.3)' }}
            >
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent-cyan)', fontWeight: 700 }}>FREELANCE AGENCY</div>
              <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)' }}>Votiv Labs ↗</div>
            </a>
          </div>
        </div>

        {/* 3D Robot Container */}
        <div>
          <Robot3D />
        </div>
      </div>
    </div>
  );
}
