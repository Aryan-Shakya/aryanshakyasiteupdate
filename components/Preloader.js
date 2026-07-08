'use client';

import { useState, useEffect } from 'react';

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    setProgress(100);
    setDone(true);
    document.body.classList.remove('loading');
    if (onComplete) onComplete();
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
