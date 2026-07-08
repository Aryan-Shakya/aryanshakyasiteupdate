'use client';

import React, { useEffect, useState, useRef } from 'react';

export default function Robot3D({ sceneUrl = 'https://prod.spline.design/DJ9EUIqEWSfKHyhm/scene.splinecode' }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const scriptId = 'spline-viewer-script';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.type = 'module';
      script.src = 'https://unpkg.com/@splinetool/viewer@1.9.59/build/spline-viewer.js';
      script.onload = () => setLoaded(true);
      script.onerror = () => setError(true);
      document.head.appendChild(script);
    } else {
      setLoaded(true);
    }

    // Actively remove Spline watermark logo from shadowRoot
    const interval = setInterval(() => {
      if (!containerRef.current) return;
      const viewer = containerRef.current.querySelector('spline-viewer');
      if (viewer && viewer.shadowRoot) {
        const logo = viewer.shadowRoot.querySelector('#logo');
        if (logo) {
          logo.remove();
        }
      }
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      ref={containerRef}
      className="robot-container"
      style={{
        position: 'relative',
        width: '100%',
        height: '560px',
        background: 'radial-gradient(circle at 50% 50%, rgba(0, 240, 255, 0.08) 0%, rgba(8, 9, 14, 0.4) 100%)',
        borderRadius: '24px',
        overflow: 'hidden',
        border: '1px solid var(--border-subtle)',
      }}
    >
      {!loaded && !error && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.8rem',
            background: 'rgba(8, 9, 14, 0.8)',
            color: '#00F0FF',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.85rem',
            zIndex: 20,
          }}
        >
          <div className="hero-status-dot" style={{ width: '16px', height: '16px', background: '#00F0FF' }} />
          <span>INITIALIZING VOTIV LABS 3D ROBOT CORE...</span>
        </div>
      )}

      {error ? (
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
      ) : (
        <spline-viewer
          url={sceneUrl}
          style={{ width: '100%', height: '100%', display: loaded ? 'block' : 'none' }}
        ></spline-viewer>
      )}

      {/* Mask over bottom right to ensure zero watermark ever displays */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: '180px',
          height: '45px',
          background: 'transparent',
          pointerEvents: 'none',
          zIndex: 15,
        }}
      />

      {/* Decorative cyber corner tags */}
      <div
        style={{
          position: 'absolute',
          top: '1.5rem',
          left: '1.5rem',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.7rem',
          color: '#00F0FF',
          letterSpacing: '0.15em',
          pointerEvents: 'none',
          zIndex: 10,
        }}
      >
        [ 3D AI CYBERNETIC CORE // VOTIV LABS ]
      </div>
      <div
        style={{
          position: 'absolute',
          bottom: '1.5rem',
          right: '1.5rem',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.65rem',
          color: '#94A3B8',
          letterSpacing: '0.1em',
          pointerEvents: 'none',
          zIndex: 20,
        }}
      >
        DRAG / ROTATE TO INTERACT
      </div>
    </div>
  );
}
