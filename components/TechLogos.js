'use client';

import React from 'react';

const LOGOS = [
  { name: 'Arduino Uno', icon: '🤖', category: 'Hardware / IoT' },
  { name: 'Raspberry Pi 4/5', icon: '🍓', category: 'Embedded Linux' },
  { name: 'ESP32 / ESP8266', icon: '📡', category: 'Microcontrollers' },
  { name: 'Python', icon: '🐍', category: 'AI & Backend' },
  { name: 'Java', icon: '☕', category: 'Systems' },
  { name: 'C / C++', icon: '⚙️', category: 'Firmware & Core' },
  { name: 'Google Cloud', icon: '☁️', category: 'Cloud Infrastructure' },
  { name: 'Firebase', icon: '🔥', category: 'Realtime Telemetry' },
  { name: 'GitHub', icon: '🐙', category: 'Version Control' },
  { name: 'Next.js', icon: '▲', category: 'Full-Stack Web' },
  { name: 'React', icon: '⚛️', category: 'UI Architecture' },
  { name: 'Three.js / GSAP', icon: '✦', category: '3D Web & Animation' },
  { name: 'MongoDB / SQL', icon: '🗄️', category: 'Databases' },
  { name: 'Linux / Bash', icon: '🐧', category: 'OS & Scripting' },
];

export default function TechLogos() {
  // We duplicate the list to make the infinite CSS marquee seamless
  const duplicatedLogos = [...LOGOS, ...LOGOS];

  return (
    <div className="tech-logos-section" style={{ width: '100%', margin: '4rem 0' }}>
      <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <div className="section-label">[ HARDWARE &amp; SOFTWARE ARSENAL ]</div>
        <h3 style={{ fontSize: '1.4rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '-0.01em', margin: 0 }}>
          TECHNOLOGIES &amp; PLATFORMS I BUILD WITH
        </h3>
      </div>

      <div className="tech-marquee-wrap">
        <div className="tech-marquee-track">
          {duplicatedLogos.map((tech, index) => (
            <div key={index} className="tech-badge">
              <span style={{ fontSize: '1.3rem' }}>{tech.icon}</span>
              <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#fff' }}>{tech.name}</span>
                <span style={{ fontSize: '0.65rem', color: 'var(--accent-gold)', letterSpacing: '0.05em' }}>{tech.category}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
