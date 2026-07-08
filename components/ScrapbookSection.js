'use client';

import React, { useState } from 'react';
import { DoodleTape, DoodleStar, DoodleSparkle, ComicBadge } from '@/components/Doodles';

const MEMORIES = [
  { id: 1, title: 'AI Workshop Leader', date: '2025', desc: 'Mentoring 400+ students in rural schools on foundational AI principles.', emoji: '🎤', angle: '-4deg', tapeColor: 'rgba(255, 107, 53, 0.8)' },
  { id: 2, title: 'YANTRIX Robotics Club', date: '2025', desc: 'Co-founding our university IoT club and building the AI campus reception bot.', emoji: '🤖', angle: '3deg', tapeColor: 'rgba(163, 230, 53, 0.8)' },
  { id: 3, title: 'Late Night Debugging', date: 'Always', desc: 'Coffee, dual monitors, ESP32 telemetry, and lo-fi beats at 3 AM.', emoji: '☕', angle: '-2deg', tapeColor: 'rgba(255, 219, 112, 0.8)' },
  { id: 4, title: 'Hackathon Win', date: '2024', desc: '48 hours of continuous coding, hardware soldering, and team triumph.', emoji: '🏆', angle: '5deg', tapeColor: 'rgba(255, 107, 53, 0.8)' },
];

const SHOWS = [
  { name: 'Rick and Morty', quote: '"Wubba Lubba Dub-Dub!"', genre: 'Sci-Fi / Multiverse Madness', icon: '🥒', rating: '10/10' },
  { name: 'Harry Potter', quote: '"I solemnly swear that I am up to no good."', genre: 'Wizarding World & Magic', icon: '⚡', rating: '10/10' },
  { name: 'Silicon Valley', quote: '"Always middle out compression."', genre: 'Tech Startup Satire', icon: '💻', rating: '9.5/10' },
  { name: 'Mr. Robot', quote: '"We are all living in each other\'s paranoia."', genre: 'Cybersecurity & Hackers', icon: 'hoodie', emoji: '🧑‍💻', rating: '10/10' },
];

export default function ScrapbookSection() {
  const [activeMemory, setActiveMemory] = useState(null);

  return (
    <div className="scrapbook-section" style={{ width: '100%', margin: '5rem 0' }}>
      <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
        <div className="section-label">[ 02 — THE PERSONAL SCRAPBOOK ]</div>
        <h2 className="section-heading" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}>
          BEYOND THE<br /><em>TERMINAL</em>
        </h2>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '550px', margin: '0.8rem auto 0', fontSize: '1.05rem' }}>
          A magazine-style peek into my music playlists, favorite sitcoms, captured memories, and cultural roots.
        </p>
      </div>

      {/* Grid: Spotify & Sitcoms */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', marginBottom: '4rem' }}>
        {/* Spotify Vinyl Player Widget */}
        <div className="scrapbook-widget-card" style={{ background: 'linear-gradient(135deg, #111e11, #0a0e0a)', border: '1px solid #1db954' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <span style={{ fontSize: '1.5rem' }}>🎧</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, color: '#1db954', letterSpacing: '0.05em' }}>SPOTIFY PLAYLIST</span>
            </div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', padding: '0.2rem 0.6rem', background: 'rgba(29, 185, 84, 0.2)', color: '#1db954', borderRadius: '100px' }}>
              ON ROTATION
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', padding: '1rem', background: 'rgba(0,0,0,0.4)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '1.2rem' }}>
            <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: 'conic-gradient(#111 0%, #333 30%, #111 50%, #222 80%, #111 100%)', border: '3px solid #1db954', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 15px rgba(29, 185, 84, 0.4)', animation: 'spin 12s linear infinite' }}>
              <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#1db954' }} />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '1.1rem', color: '#fff' }}>Coding &amp; Lo-Fi Beats</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-secondary)', margin: '0.2rem 0' }}>Synthwave &bull; Lo-Fi &bull; High Energy</div>
              <div style={{ fontSize: '0.75rem', color: '#1db954', fontWeight: 600 }}>▶ Playing: Cyberpunk Synth Core</div>
            </div>
          </div>

          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
            Music is the fuel behind 10,000 lines of code. From intense EDM during hackathons to chill ambient acoustics when debugging embedded C firmware.
          </p>
        </div>

        {/* Sitcoms & Shows Grid */}
        <div className="scrapbook-widget-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <span style={{ fontSize: '1.5rem' }}>📺</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, color: 'var(--accent-gold)', letterSpacing: '0.05em' }}>FAVORITE SITCOMS &amp; SHOWS</span>
            </div>
            <DoodleSparkle />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            {SHOWS.map((show, i) => (
              <div key={i} className="tv-show-card">
                <span style={{ fontSize: '1.8rem' }}>{show.icon || show.emoji}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 800, fontSize: '0.95rem', color: '#fff' }}>{show.name}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--accent-lime)', background: 'rgba(163,230,53,0.1)', padding: '0.1rem 0.5rem', borderRadius: '4px' }}>{show.rating}</span>
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent-gold)', fontStyle: 'italic', margin: '0.2rem 0' }}>
                    {show.quote}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scrapbook Memories Collage */}
      <div style={{ marginBottom: '5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
          <ComicBadge text="MEMORIES" color="var(--accent-orange)" />
          <h3 style={{ fontSize: '1.8rem', fontWeight: 800, margin: 0 }}>CAPTURED MOMENTS &amp; MILESTONES</h3>
        </div>

        <div className="scrapbook-grid">
          {MEMORIES.map((m) => (
            <div
              key={m.id}
              className="polaroid-card"
              style={{ transform: `rotate(${m.angle})` }}
              onClick={() => setActiveMemory(activeMemory === m.id ? null : m.id)}
            >
              <DoodleTape angle="0deg" color={m.tapeColor} />
              <div className="polaroid-img" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '4.5rem', background: 'linear-gradient(135deg, #fff3e0, #ffe0b2)', border: '1px solid #ddd' }}>
                {m.emoji}
              </div>
              <div className="polaroid-caption">{m.title}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#666', textAlign: 'center', marginTop: '0.3rem' }}>
                {m.date}
              </div>
              <p style={{ fontSize: '0.85rem', color: '#333', textAlign: 'center', marginTop: '0.8rem', lineHeight: 1.5 }}>
                {m.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Indian Culture & Heritage Showcase */}
      <div className="culture-card">
        <div style={{ position: 'absolute', top: '-10px', right: '-10px', fontSize: '12rem', opacity: 0.08, pointerEvents: 'none' }}>
          🇮🇳
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.2rem' }}>
          <ComicBadge text="INDIAN ROOTS" color="var(--accent-lime)" textColor="#000" />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--accent-gold)' }}>
            ✦ UNITY IN DIVERSITY &bull; CREATIVE VIBRANCY
          </span>
        </div>

        <h3 style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 900, textTransform: 'uppercase', lineHeight: 1.2, marginBottom: '1rem' }}>
          WHERE ANCIENT HERITAGE<br />INSPIRES <em style={{ color: 'var(--accent-orange)' }}>MODERN TECH</em>
        </h3>

        <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', maxWidth: '750px', lineHeight: 1.8, marginBottom: '2rem' }}>
          Growing up in India means being surrounded by a kaleidoscope of colors, thousands of years of architectural brilliance, and vibrant festivals like Diwali and Holi. This rich cultural backdrop fuels my passion for bold color palettes, intricate system architecture, and building technology that brings diverse communities together.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem' }}>
          <span className="culture-tag" style={{ background: '#ff9933', color: '#000' }}>🏵️ VIBRANT COLOR PALETTES</span>
          <span className="culture-tag" style={{ background: '#ffffff', color: '#000' }}>🕊️ PHILOSOPHY &amp; MINDFULNESS</span>
          <span className="culture-tag" style={{ background: '#138808', color: '#fff' }}>🌱 SUSTAINABLE INNOVATION</span>
          <span className="culture-tag" style={{ background: 'var(--accent-gold)', color: '#000' }}>🪔 FESTIVALS OF LIGHT &amp; TECH</span>
          <span className="culture-tag" style={{ background: 'var(--accent-coral)', color: '#fff' }}>🏛️ TIMELESS ARCHITECTURE</span>
        </div>
      </div>
    </div>
  );
}
