'use client';

import React from 'react';

export function DoodleArrow({ direction = 'right', className = '', style = {} }) {
  const transforms = {
    right: 'rotate(0deg)',
    left: 'rotate(180deg)',
    down: 'rotate(90deg)',
    up: 'rotate(-90deg)',
    curvedRight: 'rotate(15deg)',
  };

  return (
    <svg
      viewBox="0 0 100 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`doodle-arrow ${className}`}
      style={{ width: '80px', height: '32px', transform: transforms[direction] || transforms.right, ...style }}
    >
      <path
        d="M5 20Q40 5 85 20M85 20L70 8M85 20L72 32"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="120"
        className="doodle-path"
      />
    </svg>
  );
}

export function DoodleStar({ size = 32, color = 'var(--accent-gold)', className = '', style = {} }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`doodle-star ${className}`}
      style={{ color, ...style }}
    >
      <path
        d="M20 2Q24 15 38 20Q24 25 20 38Q16 25 2 20Q16 15 20 2Z"
        fill="currentColor"
        stroke="#000"
        strokeWidth="2"
      />
    </svg>
  );
}

export function DoodleSparkle({ size = 24, className = '', style = {} }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`doodle-sparkle ${className}`}
      style={style}
    >
      <path
        d="M15 0L18 12L30 15L18 18L15 30L12 18L0 15L12 12L15 0Z"
        fill="var(--accent-orange)"
      />
    </svg>
  );
}

export function DoodleUnderline({ className = '', style = {} }) {
  return (
    <svg
      viewBox="0 0 200 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`doodle-underline ${className}`}
      style={{ width: '100%', height: '16px', ...style }}
    >
      <path
        d="M3 12Q50 3 100 13Q150 23 197 8"
        stroke="var(--accent-coral)"
        strokeWidth="4"
        strokeLinecap="round"
        className="doodle-path"
      />
    </svg>
  );
}

export function DoodleTape({ angle = '-3deg', color = 'rgba(255, 235, 150, 0.75)', style = {} }) {
  return (
    <div
      className="doodle-tape"
      style={{
        position: 'absolute',
        top: '-12px',
        left: '50%',
        transform: `translateX(-50%) rotate(${angle})`,
        width: '110px',
        height: '28px',
        backgroundColor: color,
        boxShadow: '0 2px 5px rgba(0,0,0,0.15)',
        borderLeft: '2px dashed rgba(0,0,0,0.1)',
        borderRight: '2px dashed rgba(0,0,0,0.1)',
        zIndex: 5,
        pointerEvents: 'none',
        ...style,
      }}
    />
  );
}

export function ComicBadge({ text = 'BOOM!', color = 'var(--accent-lime)', textColor = '#000', style = {} }) {
  return (
    <div
      className="comic-badge"
      style={{
        display: 'inline-block',
        padding: '0.3rem 0.8rem',
        backgroundColor: color,
        color: textColor,
        fontFamily: 'var(--font-mono)',
        fontWeight: 800,
        fontSize: '0.8rem',
        textTransform: 'uppercase',
        border: '2px solid #000',
        boxShadow: '3px 3px 0 #000',
        borderRadius: '6px',
        transform: 'rotate(-4deg)',
        ...style,
      }}
    >
      {text}
    </div>
  );
}
