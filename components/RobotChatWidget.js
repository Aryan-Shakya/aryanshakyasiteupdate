'use client';

import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Robot } from '@/components/Robot';
import ChatbotTerminal from '@/components/ChatbotTerminal';

export default function RobotChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 9999, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '1rem' }}>
      <style jsx global>{`
        @keyframes widgetPopIn {
          from { opacity: 0; transform: scale(0.8) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>

      {/* Floating Chat Dialog Window */}
      {isOpen && (
        <div
          className="interactive-card"
          style={{
            width: 'min(460px, 92vw)',
            background: '#FFFDF9',
            borderRadius: '24px',
            border: '2px solid var(--accent-teal)',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.15), 0 0 30px rgba(42, 157, 143, 0.15)',
            overflow: 'hidden',
            animation: 'widgetPopIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
            transformOrigin: 'bottom right',
          }}
        >
          {/* Header Bar */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 1.5rem', background: '#F8F4EC', borderBottom: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
              <span style={{ fontSize: '1.5rem' }}>🤖</span>
              <div>
                <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#1A1816', fontFamily: 'var(--font-display)' }}>
                  ARYAN&apos;S AI ASSISTANT
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--accent-teal)', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                  [ ONLINE &bull; READY TO HELP ]
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close AI Chatbot"
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'rgba(230, 57, 70, 0.1)',
                color: 'var(--accent-rose)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.2rem',
                fontWeight: 800,
                border: '1px solid rgba(230, 57, 70, 0.3)',
                transition: 'all 0.2s ease',
              }}
            >
              &times;
            </button>
          </div>

          {/* Chatbot CLI Terminal Embedded */}
          <div style={{ padding: '0.5rem', background: 'var(--bg-primary)' }}>
            <ChatbotTerminal />
          </div>

          {/* Quick Footer */}
          <div style={{ padding: '0.8rem 1.5rem', background: 'var(--bg-elevated)', borderTop: '1px solid var(--border-subtle)', textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
            ⚡ ASK ME ABOUT SKILLS, PROJECTS, OR DOWNLOAD CV
          </div>
        </div>
      )}

      {/* Floating Tooltip Bubble when closed */}
      {!isOpen && (
        <div
          onClick={() => setIsOpen(true)}
          style={{
            background: '#141726',
            color: '#FFFFFF',
            padding: '0.65rem 1.5rem',
            borderRadius: '100px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.82rem',
            fontWeight: 800,
            boxShadow: '0 8px 25px rgba(0, 240, 255, 0.35)',
            border: '2px solid #00F0FF',
            cursor: 'pointer',
            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
            transition: 'transform 0.2s var(--ease-out)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            userSelect: 'none',
          }}
        >
          <span style={{ color: '#00F0FF', fontSize: '0.9rem' }}>●</span>
          <span>TALK TO AI ASSISTANT</span>
        </div>
      )}

      {/* 3D Robot Floating Widget Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label="Toggle AI Chatbot"
        style={{
          width: '84px',
          height: '84px',
          borderRadius: '50%',
          background: '#0D0F18',
          border: isOpen ? '3px solid #FF0055' : '3px solid #00F0FF',
          boxShadow: isOpen
            ? '0 15px 35px rgba(255, 0, 85, 0.4)'
            : '0 15px 35px rgba(0, 240, 255, 0.45)',
          cursor: 'pointer',
          position: 'relative',
          overflow: 'hidden',
          padding: 0,
          transform: isHovered ? 'scale(1.08) translateY(-4px)' : 'scale(1)',
          transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
      >
        <div style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
          <Suspense fallback={<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', fontSize: '1.8rem' }}>🤖</div>}>
            <Canvas camera={{ position: [0, -0.3, 3.8], fov: 45 }}>
              <ambientLight intensity={2.0} />
              <directionalLight position={[5, 5, 5]} intensity={2.5} color="#ffffff" />
              <directionalLight position={[-5, -5, -5]} intensity={1.5} color="#00f0ff" />
              <Robot />
            </Canvas>
          </Suspense>
        </div>
      </button>
    </div>
  );
}
