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

    // Actively strip Spline logo and inject style into shadowRoot
    const cleanShadowDom = () => {
      if (!containerRef.current) return;
      const viewer = containerRef.current.querySelector('spline-viewer');
      if (viewer && viewer.shadowRoot) {
        const logo = viewer.shadowRoot.querySelector('#logo');
        if (logo) logo.remove();

        if (!viewer.shadowRoot.querySelector('#no-watermark-style')) {
          const style = document.createElement('style');
          style.id = 'no-watermark-style';
          style.innerHTML = '#logo, a[class*="logo"] { display: none !important; opacity: 0 !important; visibility: hidden !important; pointer-events: none !important; }';
          viewer.shadowRoot.appendChild(style);
        }
      }
    };

    const interval = setInterval(cleanShadowDom, 150);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      ref={containerRef}
      className="robot-container"
      style={{
        position: 'relative',
        width: '100%',
        height: '580px',
        background: '#0F111A',
        borderRadius: '24px',
        overflow: 'hidden',
        border: '1px solid rgba(0, 240, 255, 0.25)',
        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.4), inset 0 0 40px rgba(0, 240, 255, 0.05)',
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
            background: '#0F111A',
            color: '#00F0FF',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.85rem',
            zIndex: 20,
          }}
        >
          <div className="hero-status-dot" style={{ width: '16px', height: '16px', background: '#00F0FF' }} />
          <span>INITIALIZING VOTIV LABS AI INTERACTIVE ROBOT...</span>
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

      {/* Physical cover over bottom right corner to ensure 100% zero watermark visibility */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: '210px',
          height: '52px',
          background: 'linear-gradient(135deg, transparent 0%, #0F111A 50%)',
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
          fontSize: '0.75rem',
          color: '#00F0FF',
          fontWeight: 800,
          letterSpacing: '0.15em',
          pointerEvents: 'none',
          zIndex: 20,
        }}
      >
        [ AI ROBOTIC CORE // VOTIV LABS ]
      </div>
      <div
        style={{
          position: 'absolute',
          bottom: '1.5rem',
          right: '1.8rem',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.7rem',
          color: '#00F0FF',
          fontWeight: 700,
          letterSpacing: '0.1em',
          pointerEvents: 'none',
          zIndex: 25,
        }}
      >
        ● ACTIVE GAZE TRACKING
      </div>
    </div>
  );
}
