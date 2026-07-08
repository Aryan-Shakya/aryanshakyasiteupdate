'use client';

import { useState, useEffect } from 'react';

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += Math.random() * 18;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setTimeout(() => {
          setDone(true);
          document.body.classList.remove('loading');
          if (onComplete) onComplete();
        }, 400);
      }
      setProgress(Math.floor(current));
    }, 80);

    document.body.classList.add('loading');

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className={`preloader ${done ? 'done' : ''}`}>
      <div className="preloader-bar-track">
        <div
          className="preloader-bar-fill"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="preloader-count">{progress}</div>
      <div className="preloader-text">LOADING EXPERIENCE</div>
    </div>
  );
}
