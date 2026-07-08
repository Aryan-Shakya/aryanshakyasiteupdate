'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Preloader from '@/components/Preloader';
import CustomCursor from '@/components/CustomCursor';
import Navigation from '@/components/Navigation';
import HeroBanner from '@/components/HeroBanner';
import ChatbotTerminal from '@/components/ChatbotTerminal';
import ResumeBar from '@/components/ResumeBar';
import TechLogos from '@/components/TechLogos';
import { DoodleArrow, DoodleStar, DoodleSparkle, DoodleUnderline, ComicBadge } from '@/components/Doodles';

const NoiseOverlay = dynamic(() => import('@/components/NoiseOverlay'), { ssr: false });
const ScrapbookSection = dynamic(() => import('@/components/ScrapbookSection'), { ssr: false });
const HarryPotterGame = dynamic(() => import('@/components/HarryPotterGame'), { ssr: false });
const SocialFeed = dynamic(() => import('@/components/SocialFeed'), { ssr: false });
const DinoGame = dynamic(() => import('@/components/DinoGame'), { ssr: false });

export default function HomeClient({ initialData }) {
  const [data, setData] = useState(initialData);

  useEffect(() => {
    // Optionally fetch dynamic content updates if needed
    fetch('/api/admin/content')
      .then(res => res.json())
      .then(d => { if (d && !d.error) setData(d); })
      .catch(() => {});
  }, []);

  const { hero, about, projects, skills, contact } = data || {};

  return (
    <div className="portfolio-wrapper" style={{ minHeight: '100vh', background: 'var(--bg-primary)', color: 'var(--text-primary)', position: 'relative', overflowX: 'hidden' }}>
      {/* Gamified Systems */}
      <Preloader />
      <CustomCursor />
      <NoiseOverlay />
      <Navigation />

      {/* Main Storytelling Magazine Layout */}
      <main className="fm-inner" style={{ maxWidth: '1300px', margin: '0 auto', padding: '6rem 1.5rem 2rem' }}>
        
        {/* Magazine Story Header Badge */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', marginBottom: '1rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
            <ComicBadge text="VOL. 03" color="var(--accent-gold)" textColor="#000" />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              THE INTERACTIVE PORTFOLIO MAGAZINE &bull; ARYAN SHAKYA
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent-lime)' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-lime)', display: 'inline-block', boxShadow: '0 0 10px var(--accent-lime)' }} />
            <span>AVAILABLE FOR WORK &amp; COLLABORATION</span>
          </div>
        </div>

        {/* 1. Hero Banner: Widescreen Anime Illustration & 3D Robot */}
        <HeroBanner hero={hero} />

        {/* 2. Intelligent AI Chatbot CLI Terminal */}
        <div style={{ margin: '4rem 0', position: 'relative' }}>
          <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
            <div className="section-label">[ 02 — ASK THE AI CHATBOT ]</div>
            <h3 style={{ fontSize: '1.6rem', fontWeight: 800 }}>
              INTERACTIVE DEVELOPER TERMINAL
            </h3>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              Type commands like &apos;skills&apos;, &apos;projects&apos;, &apos;resume&apos; or ask me anything in natural language!
            </p>
          </div>
          <ChatbotTerminal />
        </div>

        {/* 3. One-Click Resume Bar */}
        <ResumeBar />

        {/* 4. Tech Stack Hardware & Software Marquee */}
        <TechLogos />

        {/* 5. Personal Scrapbook (Spotify, Sitcoms, Memories & Indian Culture) */}
        <ScrapbookSection />

        {/* 6. Gamified Harry Potter Spell-Casting Mini-Game */}
        <HarryPotterGame />

        {/* 7. Featured Projects Section with Doodle Accents */}
        <section id="projects" style={{ margin: '6rem 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', marginBottom: '3rem' }}>
            <div>
              <div className="section-label">[ 04 — SELECTED BUILDINGS ]</div>
              <h2 className="section-heading" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', margin: 0 }}>
                HARDWARE &amp; <em>WEB APPS</em>
              </h2>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--accent-gold)' }}>Hover over cards to interact</span>
              <DoodleArrow direction="curvedRight" style={{ width: '45px', height: '22px', color: 'var(--accent-orange)' }} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
            {(projects || []).map((proj, i) => (
              <div
                key={i}
                className="interactive-card project-card"
                style={{
                  background: '#FFF',
                  border: '2px solid var(--border-light)',
                  borderRadius: '20px',
                  padding: '2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 15px 35px rgba(0,0,0,0.06)',
                  transition: 'all 0.4s ease',
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent-rose)', fontWeight: 800 }}>
                      [ PROJECT 0{i + 1} ]
                    </span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', padding: '0.3rem 0.8rem', background: '#F8F4EC', borderRadius: '100px', fontWeight: 700 }}>
                      {proj.category || 'IoT / Web'}
                    </span>
                  </div>
                  <h3 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '0.8rem', color: '#1A1816' }}>{proj.title}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.5rem', fontWeight: 500 }}>
                    {proj.description || proj.desc}
                  </p>
                </div>

                <div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
                    {(proj.tech || []).map((t, idx) => (
                      <span key={idx} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', padding: '0.3rem 0.6rem', background: 'rgba(42, 157, 143, 0.1)', color: 'var(--accent-teal)', borderRadius: '6px', border: '1px solid rgba(42, 157, 143, 0.3)', fontWeight: 700 }}>
                        {t}
                      </span>
                    ))}
                  </div>

                  {proj.link && (
                    <a
                      href={proj.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="resume-btn"
                      style={{ padding: '0.6rem 1.4rem', fontSize: '0.8rem', width: '100%', justifyContent: 'center', background: 'var(--accent-teal)', color: '#fff' }}
                    >
                      <span>EXPLORE REPOSITORY / LIVE</span>
                      <span>↗</span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 8. Social Media Feed Grid */}
        <SocialFeed />

        {/* 9. Contact / Collaboration Finale */}
        <section id="contact" style={{ margin: '6rem 0', textAlign: 'center', padding: '4rem 2rem', background: 'linear-gradient(135deg, rgba(230, 57, 70, 0.1), rgba(255, 183, 3, 0.12))', borderRadius: '24px', border: '2px solid var(--accent-rose)', position: 'relative', overflow: 'hidden', boxShadow: '0 15px 40px rgba(0,0,0,0.05)' }}>
          <div style={{ position: 'absolute', top: '1rem', left: '2rem' }}><DoodleStar size={36} color="var(--accent-gold)" /></div>
          <div style={{ position: 'absolute', bottom: '1rem', right: '2rem' }}><DoodleSparkle size={36} color="var(--accent-rose)" /></div>

          <ComicBadge text="NEXT STEPS" color="var(--accent-gold)" textColor="#000" />
          <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.8rem)', fontWeight: 900, margin: '1rem 0', textTransform: 'uppercase', color: '#1A1816' }}>
            LET&apos;S BUILD SOMETHING<br /><em style={{ color: 'var(--accent-rose)' }}>EXTRAORDINARY</em>
          </h2>
          <DoodleUnderline style={{ maxWidth: '400px', margin: '0 auto 1.5rem auto', color: 'var(--accent-teal)' }} />

          <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 2rem auto', fontWeight: 600 }}>
            Whether you are looking for an innovative full-stack intern, need IoT embedded telemetry solutions, or want to collaborate on creative 3D web applications — my inbox is open!
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
            <a href={`mailto:${contact?.email || 'aryanshakyaofficial.mail@gmail.com'}`} className="resume-btn" style={{ fontSize: '1rem', padding: '1rem 2.5rem', background: 'var(--accent-rose)', color: '#fff' }}>
              📧 SEND AN EMAIL
            </a>
            <a href={`https://wa.me/${(contact?.whatsapp || '919322311917').replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="resume-btn" style={{ fontSize: '1rem', padding: '1rem 2.5rem', background: '#25D366', color: '#fff' }}>
              💬 WHATSAPP CHAT
            </a>
          </div>
        </section>

      </main>

      {/* 10. Playable Google Dino Runner Footer */}
      <footer style={{ marginTop: '4rem' }}>
        <DinoGame />
        <div style={{ padding: '2rem', textAlign: 'center', background: '#EFEAE0', borderTop: '1px solid var(--border-subtle)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 700 }}>
          <div style={{ marginBottom: '0.5rem' }}>
            &copy; 2026 ARYAN SHAKYA &bull; BUILT WITH NEXT.JS, GSAP &amp; THREE.JS
          </div>
          <div>
            DESIGNED WITH GAMIFIED STORYTELLING &bull; 100% SEO &amp; AEO OPTIMIZED
          </div>
        </div>
      </footer>
    </div>
  );
}
