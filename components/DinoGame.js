'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ComicBadge } from '@/components/Doodles';

export default function DinoGame() {
  const canvasRef = useRef(null);
  const [gameState, setGameState] = useState('start'); // start, playing, gameover
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.code === 'Space' || e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') && gameState === 'start') {
        e.preventDefault();
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
    let H = canvas.height = 160;

    let dino = {
      x: 50,
      y: H - 40,
      width: 30,
      height: 35,
      vy: 0,
      jumpForce: -11,
      gravity: 0.6,
      isGrounded: true,
    };

    let obstacles = [];
    let frameCount = 0;
    let currentScore = score;
    let gameSpeed = 5;

    const handleJump = (e) => {
      if ((e.code === 'Space' || e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') && dino.isGrounded) {
        e.preventDefault();
        dino.vy = dino.jumpForce;
        dino.isGrounded = false;
      }
    };

    const handleTouchJump = (e) => {
      e.preventDefault();
      if (dino.isGrounded) {
        dino.vy = dino.jumpForce;
        dino.isGrounded = false;
      }
    };

    window.addEventListener('keydown', handleJump);
    canvas.addEventListener('touchstart', handleTouchJump);
    canvas.addEventListener('mousedown', handleTouchJump);

    const loop = () => {
      frameCount++;
      ctx.fillStyle = '#FFFDF9';
      ctx.fillRect(0, 0, W, H);

      // Ground line
      ctx.strokeStyle = 'var(--accent-rose)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, H - 5);
      ctx.lineTo(W, H - 5);
      ctx.stroke();

      // Update dino physics
      dino.vy += dino.gravity;
      dino.y += dino.vy;
      if (dino.y > H - 40) {
        dino.y = H - 40;
        dino.vy = 0;
        dino.isGrounded = true;
      }

      // Draw Dino / Tech Bot
      ctx.save();
      ctx.translate(dino.x, dino.y);
      ctx.fillStyle = '#2A9D8F'; // Teal green bot
      ctx.fillRect(0, 0, dino.width, dino.height);
      // Eye
      ctx.fillStyle = '#FFF';
      ctx.fillRect(18, 6, 6, 6);
      ctx.fillStyle = '#000';
      ctx.fillRect(20, 8, 2, 2);
      // Cyber antenna
      ctx.fillStyle = '#E63946';
      ctx.fillRect(12, -8, 6, 8);
      ctx.restore();

      // Spawn Obstacles (404 Cactus / Glitches)
      if (frameCount % Math.max(40, Math.floor(100 - gameSpeed * 3)) === 0 && Math.random() > 0.3) {
        obstacles.push({
          x: W + 20,
          y: H - 35,
          width: 20,
          height: Math.random() > 0.5 ? 30 : 22,
          speed: gameSpeed,
          label: Math.random() > 0.5 ? '404' : 'BUG',
        });
      }

      // Update and draw obstacles
      for (let i = obstacles.length - 1; i >= 0; i--) {
        let obs = obstacles[i];
        obs.x -= obs.speed;

        ctx.fillStyle = '#E63946';
        ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
        ctx.fillStyle = '#FFF';
        ctx.font = 'bold 9px monospace';
        ctx.fillText(obs.label, obs.x - 2, obs.y - 5);

        // Collision Check
        if (
          dino.x < obs.x + obs.width - 4 &&
          dino.x + dino.width > obs.x + 4 &&
          dino.y < obs.y + obs.height - 4 &&
          dino.y + dino.height > obs.y + 4
        ) {
          setGameState('gameover');
          if (currentScore > highScore) setHighScore(currentScore);
          return;
        }

        if (obs.x < -40) {
          obstacles.splice(i, 1);
          currentScore += 5;
          setScore(currentScore);
          if (currentScore % 50 === 0) gameSpeed += 0.5; // Speed up!
        }
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('keydown', handleJump);
      if (canvas) {
        canvas.removeEventListener('touchstart', handleTouchJump);
        canvas.removeEventListener('mousedown', handleTouchJump);
      }
    };
  }, [gameState]);

  return (
    <div className="dino-footer-wrap">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
        <ComicBadge text="EASTER EGG" color="var(--accent-rose)" textColor="#fff" />
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: '#1A1816', fontWeight: 800 }}>
          🦖 TECH DINO RUNNER — JUMP OVER 404 BUGS!
        </span>
      </div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.8rem', fontWeight: 600 }}>
        [ Press SPACE or UP ARROW or Click/Touch Canvas to Jump ] &bull; Score: {score} &bull; High: {highScore}
      </div>

      <div style={{ position: 'relative', width: '100%', maxWidth: '800px', margin: '0 auto' }}>
        <canvas ref={canvasRef} className="dino-canvas" />

        {gameState === 'start' && (
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(255, 253, 249, 0.85)', display: 'flex', alignItems: 'center', justify: 'center', gap: '1rem' }}>
            <span style={{ fontSize: '1.8rem' }}>🦖</span>
            <button onClick={startGame} className="resume-btn" style={{ padding: '0.5rem 1.5rem', fontSize: '0.85rem', background: 'var(--accent-teal)', color: '#fff' }}>
              PRESS SPACE / CLICK TO PLAY
            </button>
          </div>
        )}

        {gameState === 'gameover' && (
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(255, 240, 240, 0.9)', display: 'flex', alignItems: 'center', justify: 'center', gap: '1rem' }}>
            <span style={{ color: '#E63946', fontWeight: 800, fontFamily: 'var(--font-mono)' }}>CRASHED INTO BUG! Score: {score}</span>
            <button onClick={startGame} className="resume-btn" style={{ padding: '0.4rem 1.2rem', fontSize: '0.8rem', background: 'var(--accent-rose)', color: '#fff' }}>
              REBOOT RUNNER
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
