'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Application } from '@splinetool/runtime';

export default function Robot3D({ sceneUrl = 'https://prod.spline.design/DJ9EUIqEWSfKHyhm/scene.splinecode' }) {
  const canvasRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!canvasRef.current) return;
    let app = null;

    try {
      app = new Application(canvasRef.current);
      app
        .load(sceneUrl)
        .then(() => {
          setLoading(false);
        })
        .catch((err) => {
          console.error('Error loading Spline scene:', err);
          setError(true);
          setLoading(false);
        });
    } catch (err) {
      console.error('Failed to init Spline Application:', err);
      setError(true);
      setLoading(false);
    }

    return () => {
      if (app && app.dispose) {
        app.dispose();
      }
    };
  }, [sceneUrl]);

  return (
    <div
      className="robot-container"
      style={{
        position: 'relative',
        width: '100%',
        height: '580px',
        background: '#0F111A',
        borderRadius: '24px',
        overflow: 'hidden',
        border: '1px solid rgba(0, 240, 255, 0.25)',
        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.4)',
      }}
    >
      {loading && !error && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.8rem',
            background: '#0F111A',
            color: '#00F0FF',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.85rem',
            zIndex: 20,
          }}
        >
          <div className="hero-status-dot" style={{ width: '16px', height: '16px', background: '#00F0FF' }} />
          <span>LOADING VOTIV LABS AI INTERACTIVE ROBOT...</span>
        </div>
      )}

      {error && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--accent-coral)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.85rem',
          }}
        >
          [3D Scene Offline] — Please check internet connection.
        </div>
      )}

      <canvas
        id="canvas3d"
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
          outline: 'none',
          cursor: 'grab',
        }}
      />

      {/* Clean header badge */}
      <div
        style={{
          position: 'absolute',
          top: '1.5rem',
          left: '1.5rem',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.75rem',
          color: '#00F0FF',
          fontWeight: 800,
          letterSpacing: '0.15em',
          pointerEvents: 'none',
          zIndex: 20,
        }}
      >
        [ AI CYBERNETIC CORE // VOTIV LABS ]
      </div>
      <div
        style={{
          position: 'absolute',
          bottom: '1.5rem',
          right: '1.8rem',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.7rem',
          color: '#94A3B8',
          fontWeight: 700,
          letterSpacing: '0.1em',
          pointerEvents: 'none',
          zIndex: 25,
        }}
      >
        ● INTERACTIVE SPLINE RUNTIME ACTIVE
      </div>
    </div>
  );
}
