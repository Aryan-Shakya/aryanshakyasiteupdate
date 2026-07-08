'use client';

import React from 'react';
import { ComicBadge, DoodleStar } from '@/components/Doodles';

const POSTS = [
  {
    id: 1,
    platform: 'Instagram',
    icon: '📸',
    handle: '@aryan.shakya._',
    date: '2 days ago',
    imgEmoji: '🚀',
    bg: 'linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
    caption: 'Soldering dual-motor aircraft stabilization boards till 4 AM! Nothing beats seeing custom telemetry data light up live on the ESP32 dashboard. ⚡ #robotics #iot #esp32 #buildinpublic',
    likes: '248',
    comments: '34',
    url: 'https://www.instagram.com',
  },
  {
    id: 2,
    platform: 'LinkedIn',
    icon: '💼',
    handle: 'Aryan Shakya',
    date: '1 week ago',
    imgEmoji: '🎙️',
    bg: 'linear-gradient(135deg, #0077b5, #00a0dc)',
    caption: 'Proud to announce that YANTRIX (our university Robotics & IoT club) successfully deployed an offline voice-controlled campus desk bot using Whisper STT & Llama3 on Raspberry Pi 4! Great team effort! 🤖🎓',
    likes: '412',
    comments: '58',
    url: 'https://www.linkedin.com/in/aryan-shakya-73035a385/',
  },
  {
    id: 3,
    platform: 'Instagram',
    icon: '📸',
    handle: '@aryan.shakya._',
    date: '2 weeks ago',
    imgEmoji: '🎸',
    bg: 'linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
    caption: 'Unplugging from code for an evening acoustic guitar session. Good music + good sunset = refreshed creative mind for next week’s Next.js release! 🎶🌅 #createlife #music',
    likes: '189',
    comments: '19',
    url: 'https://www.instagram.com',
  },
];

export default function SocialFeed() {
  return (
    <div className="social-feed-section" style={{ width: '100%', margin: '5rem 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
        <div>
          <div className="section-label">[ 04 — LIVE CREATIVE FEED ]</div>
          <h2 className="section-heading" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', margin: 0 }}>
            LATEST <em>SOCIAL POSTS</em>
          </h2>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: '1rem' }}>
          <a href="https://www.linkedin.com/in/aryan-shakya-73035a385/" target="_blank" rel="noopener noreferrer" className="resume-btn" style={{ padding: '0.6rem 1.2rem', fontSize: '0.8rem', background: '#0077b5', color: '#fff' }}>
            <span>LinkedIn</span>
            <span>↗</span>
          </a>
          <a href="https://github.com/Aryan-Shakya" target="_blank" rel="noopener noreferrer" className="resume-btn" style={{ padding: '0.6rem 1.2rem', fontSize: '0.8rem', background: '#333', color: '#fff' }}>
            <span>GitHub</span>
            <span>↗</span>
          </a>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        {POSTS.map((post) => (
          <a
            key={post.id}
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
            className="scrapbook-widget-card"
            style={{ display: 'flex', flexDirection: 'column', textDecoration: 'none', color: 'inherit', transition: 'transform 0.3s ease, border-color 0.3s ease', padding: 0, overflow: 'hidden' }}
          >
            {/* Post Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.2rem', background: '#141726', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: post.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', color: '#fff' }}>
                  {post.icon}
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#FFFFFF' }}>{post.handle}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#94A3B8', fontWeight: 600 }}>{post.date} &bull; {post.platform}</div>
                </div>
              </div>
              <span style={{ fontSize: '0.9rem', color: '#00F0FF', fontWeight: 800 }}>↗</span>
            </div>

            {/* Simulated Photo Card / Visual */}
            <div style={{ width: '100%', aspectRatio: '4/3', background: post.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '5rem', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.3) 100%)' }} />
              <span style={{ zIndex: 1, filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.3))', transform: 'scale(1.2)' }}>{post.imgEmoji}</span>
            </div>

            {/* Post Caption & Engagement */}
            <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: '#0D0F18', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
              <p style={{ fontSize: '0.95rem', color: '#E2E8F0', lineHeight: 1.65, margin: '0 0 1.2rem 0', fontWeight: 500 }}>
                {post.caption}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: '#FF0055', fontWeight: 700 }}>
                <span>❤️ {post.likes}</span>
                <span>💬 {post.comments}</span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
