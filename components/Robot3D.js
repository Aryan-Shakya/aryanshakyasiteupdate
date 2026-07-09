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
          window.splineApp = app;

          // Ensure the robot stands upright immediately on first load and does not sleep horizontally
          if (app._scene) {
            app._scene.rotation.x = 0.42;
          }
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
        background: '#E8ECEF',
        borderRadius: '24px',
        overflow: 'hidden',
        border: '1px solid #D1D5DB',
        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.35)',
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
            background: '#E8ECEF',
            color: '#1F2937',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.85rem',
            zIndex: 20,
          }}
        >
          <div className="hero-status-dot" style={{ width: '16px', height: '16px', background: '#3B82F6' }} />
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
          pointerEvents: 'none',
        }}
      />

      {/* Mask over WebGL bottom right corner watermark badge */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: '190px',
          height: '56px',
          background: '#E8ECEF',
          borderTopLeftRadius: '14px',
          pointerEvents: 'none',
          zIndex: 50,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          paddingRight: '1.6rem',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            color: '#4B5563',
            fontWeight: 700,
            letterSpacing: '0.08em',
          }}
        >
          ● INTERACTIVE 3D CORE
        </span>
      </div>

      {/* Clean header badge */}
      <div
        style={{
          position: 'absolute',
          top: '1.5rem',
          left: '1.5rem',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.75rem',
          color: '#1F2937',
          fontWeight: 800,
          letterSpacing: '0.15em',
          pointerEvents: 'none',
          zIndex: 20,
        }}
      >
        [ AI CYBERNETIC CORE // VOTIV LABS ]
      </div>
    </div>
  );
}
