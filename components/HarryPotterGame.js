'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ComicBadge } from '@/components/Doodles';

export default function HarryPotterGame() {
  const canvasRef = useRef(null);
  const [gameState, setGameState] = useState('start'); // start, playing, gameover
  const [score, setScore] = useState(0);
  const [activeSpell, setActiveSpell] = useState('lumos'); // lumos, expelliarmus, patronum
  const [highScore, setHighScore] = useState(0);

  const SPELLS = {
    lumos: { name: 'LUMOS', color: '#ffeb3b', speed: 8, size: 6, desc: 'Light Blast (Key 1)' },
    expelliarmus: { name: 'EXPELLIARMUS', color: '#ff3d00', speed: 12, size: 8, desc: 'Disarming Beam (Key 2)' },
    patronum: { name: 'EXPECTO PATRONUM', color: '#00e5ff', speed: 10, size: 14, desc: 'Patronus Wave (Key 3)' },
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === '1') setActiveSpell('lumos');
      if (e.key === '2') setActiveSpell('expelliarmus');
      if (e.key === '3') setActiveSpell('patronum');
      if (e.code === 'Space' && gameState === 'start') {
        startGame();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState]);

  function startGame() {
    setScore(0);
    setGameState('playing');
  }

  useEffect(() => {
    if (gameState !== 'playing') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let W = canvas.width = canvas.parentElement.clientWidth || 800;
    let H = canvas.height = 400;

    let wizardX = W / 2;
    let wizardY = H - 50;

    let projectiles = [];
    let enemies = [];
    let particles = [];
    let frameCount = 0;
    let currentScore = score;

    const handleResize = () => {
      if (canvas && canvas.parentElement) {
        W = canvas.width = canvas.parentElement.clientWidth;
        H = canvas.height = 400;
        wizardX = W / 2;
        wizardY = H - 50;
      }
    };
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      wizardX = e.clientX - rect.left;
      if (wizardX < 20) wizardX = 20;
      if (wizardX > W - 20) wizardX = W - 20;
    };

    const handleCanvasClick = (e) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      const angle = Math.atan2(clickY - wizardY, clickX - wizardX);
      const spell = SPELLS[activeSpell] || SPELLS.lumos;

      projectiles.push({
        x: wizardX,
        y: wizardY,
        vx: Math.cos(angle) * spell.speed,
        vy: Math.sin(angle) * spell.speed,
        radius: spell.size,
        color: spell.color,
        type: activeSpell,
      });
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('click', handleCanvasClick);

    const loop = () => {
      frameCount++;
      ctx.fillStyle = '#0a0a10';
      ctx.fillRect(0, 0, W, H);

      // Draw starry night sky
      if (frameCount % 2 === 0) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.fillRect((Math.sin(frameCount * 0.01) * W + W) % W, (Math.cos(frameCount * 0.02) * H + H) % (H - 100), 2, 2);
      }

      // Spawn Dementors / Dark Objects
      if (frameCount % 45 === 0) {
        enemies.push({
          x: Math.random() * (W - 60) + 30,
          y: -20,
          radius: Math.random() * 10 + 15,
          speed: Math.random() * 1.5 + 1.2 + (currentScore * 0.05),
          type: Math.random() > 0.5 ? 'dementor' : 'darkorb',
        });
      }

      // Update and draw projectiles
      for (let i = projectiles.length - 1; i >= 0; i--) {
        let p = projectiles[i];
        p.x += p.vx;
        p.y += p.vy;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 15;
        ctx.fill();
        ctx.shadowBlur = 0;

        if (p.x < 0 || p.x > W || p.y < 0 || p.y > H) {
          projectiles.splice(i, 1);
        }
      }

      // Update and draw enemies
      for (let i = enemies.length - 1; i >= 0; i--) {
        let e = enemies[i];
        e.y += e.speed;

        ctx.save();
        ctx.translate(e.x, e.y);
        if (e.type === 'dementor') {
          // Draw ghostly dementor
          ctx.fillStyle = 'rgba(40, 30, 60, 0.85)';
          ctx.beginPath();
          ctx.arc(0, 0, e.radius, Math.PI, 0, false);
          ctx.lineTo(e.radius, e.radius + 10);
          ctx.lineTo(0, e.radius + 5);
          ctx.lineTo(-e.radius, e.radius + 10);
          ctx.closePath();
          ctx.fill();

          ctx.fillStyle = '#ff0055';
          ctx.beginPath();
          ctx.arc(-5, -3, 3, 0, Math.PI * 2);
          ctx.arc(5, -3, 3, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Draw dark glowing orb
          ctx.beginPath();
          ctx.arc(0, 0, e.radius, 0, Math.PI * 2);
          ctx.fillStyle = '#1a0a2a';
          ctx.strokeStyle = '#9c27b0';
          ctx.lineWidth = 3;
          ctx.fill();
          ctx.stroke();
        }
        ctx.restore();

        // Check collision with wizard (Game Over)
        const distToWizard = Math.hypot(e.x - wizardX, e.y - wizardY);
        if (distToWizard < e.radius + 15) {
          setGameState('gameover');
          if (currentScore > highScore) setHighScore(currentScore);
          return;
        }

        if (e.y > H + 30) {
          enemies.splice(i, 1);
        }
      }

      // Check projectile-enemy collisions
      for (let i = enemies.length - 1; i >= 0; i--) {
        for (let j = projectiles.length - 1; j >= 0; j--) {
          let e = enemies[i];
          let p = projectiles[j];
          if (!e || !p) continue;

          const dist = Math.hypot(e.x - p.x, e.y - p.y);
          if (dist < e.radius + p.radius) {
            // Spawn explosion particles
            for (let k = 0; k < 12; k++) {
              particles.push({
                x: e.x,
                y: e.y,
                vx: (Math.random() - 0.5) * 6,
                vy: (Math.random() - 0.5) * 6,
                radius: Math.random() * 4 + 2,
                color: p.color,
                alpha: 1,
              });
            }

            enemies.splice(i, 1);
            projectiles.splice(j, 1);
            currentScore += 10;
            setScore(currentScore);
            break;
          }
        }
      }

      // Draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        let pt = particles[i];
        pt.x += pt.vx;
        pt.y += pt.vy;
        pt.alpha -= 0.03;

        if (pt.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = pt.alpha;
        ctx.fillStyle = pt.color;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Draw wizard player
      ctx.save();
      ctx.translate(wizardX, wizardY);
      // Wizard Robes
      ctx.fillStyle = '#311b92';
      ctx.beginPath();
      ctx.moveTo(0, -20);
      ctx.lineTo(15, 20);
      ctx.lineTo(-15, 20);
      ctx.closePath();
      ctx.fill();
      // Wizard Hat
      ctx.fillStyle = 'var(--accent-gold)';
      ctx.beginPath();
      ctx.moveTo(0, -35);
      ctx.lineTo(12, -15);
      ctx.lineTo(-12, -15);
      ctx.closePath();
      ctx.fill();
      // Wand glow
      ctx.fillStyle = SPELLS[activeSpell].color;
      ctx.shadowColor = SPELLS[activeSpell].color;
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(0, -40, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (canvas) {
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('click', handleCanvasClick);
      }
    };
  }, [gameState, activeSpell]);

  return (
    <div className="hp-game-section" style={{ width: '100%', margin: '4rem 0' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <div className="section-label">[ 03 — INTERACTIVE MINI-GAME ]</div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <h2 className="section-heading" style={{ fontSize: 'clamp(2rem, 5vw, 3.8rem)', margin: 0 }}>
            HARRY POTTER<br /><em>WIZARD DUEL</em>
          </h2>
          <ComicBadge text="SPELL CASTER" color="var(--accent-lime)" textColor="#000" />
        </div>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '580px', margin: '0.8rem auto 0' }}>
          Move your mouse to aim your wand and click to cast! Destroy dark dementors before they reach your wizard.
        </p>
      </div>

      {/* Spell Controls Header */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.2rem' }}>
        {Object.entries(SPELLS).map(([key, spell], i) => (
          <button
            key={key}
            onClick={() => setActiveSpell(key)}
            style={{
              padding: '0.6rem 1.2rem',
              background: activeSpell === key ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.03)',
              border: `2px solid ${activeSpell === key ? spell.color : 'var(--border-subtle)'}`,
              borderRadius: '8px',
              color: '#fff',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              boxShadow: activeSpell === key ? `0 0 15px ${spell.color}40` : 'none',
              transition: 'all 0.3s ease',
            }}
          >
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: spell.color, display: 'inline-block' }} />
            <span>{spell.name}</span>
            <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>[{i + 1}]</span>
          </button>
        ))}
      </div>

      {/* Canvas Container */}
      <div className="game-container" style={{ maxWidth: '850px', margin: '0 auto' }}>
        <div style={{ background: '#14141c', padding: '0.8rem 1.2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-subtle)', fontFamily: 'var(--font-mono)' }}>
          <span style={{ color: 'var(--accent-gold)', fontWeight: 700 }}>⚡ SCORE: {score}</span>
          <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>HIGH SCORE: {highScore}</span>
        </div>

        <div style={{ position: 'relative', width: '100%', height: '400px' }}>
          <canvas ref={canvasRef} className="game-canvas" style={{ width: '100%', height: '100%' }} />

          {/* Start Screen Overlay */}
          {gameState === 'start' && (
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(10, 10, 16, 0.85)', display: 'flex', flexDirection: 'column', alignItems: 'center', justify: 'center', gap: '1.5rem', zIndex: 10 }}>
              <div style={{ fontSize: '4rem' }}>🧙‍♂️</div>
              <div style={{ textAlign: 'center' }}>
                <h3 style={{ fontSize: '1.8rem', fontWeight: 800, margin: '0 0 0.5rem 0', color: '#fff' }}>DEFEND THE WIZARDING REALM</h3>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--text-secondary)', maxWidth: '400px' }}>
                  Use spells to defeat incoming dementors! Select spell types using keys [1], [2], [3] or buttons above.
                </p>
              </div>
              <button
                onClick={startGame}
                className="resume-btn"
                style={{ background: 'var(--accent-lime)', color: '#000', fontSize: '1rem', padding: '1rem 2.5rem' }}
              >
                ⚡ START SPELL CASTING
              </button>
            </div>
          )}

          {/* Game Over Screen Overlay */}
          {gameState === 'gameover' && (
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(20, 5, 10, 0.9)', display: 'flex', flexDirection: 'column', alignItems: 'center', justify: 'center', gap: '1.5rem', zIndex: 10 }}>
              <ComicBadge text="GAME OVER" color="var(--accent-coral)" textColor="#fff" style={{ fontSize: '1.2rem' }} />
              <div style={{ textAlign: 'center' }}>
                <h3 style={{ fontSize: '2rem', fontWeight: 900, margin: '0 0 0.5rem 0', color: '#fff' }}>THE DEMENTORS BREAK THROUGH!</h3>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem', color: 'var(--accent-gold)' }}>
                  Final Score: {score} &bull; High Score: {highScore}
                </div>
              </div>
              <button
                onClick={startGame}
                className="resume-btn"
                style={{ background: 'var(--accent-orange)', color: '#000', fontSize: '1rem', padding: '0.8rem 2rem' }}
              >
                🔄 CAST SPELLS AGAIN
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
