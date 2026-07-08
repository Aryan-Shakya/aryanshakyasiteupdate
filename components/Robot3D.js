'use client';

import { useEffect, useState } from 'react';

export default function Robot3D({ sceneUrl = 'https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode' }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Load the Spline viewer web component script dynamically
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
  }, []);

  return (
    <div className="robot-container" style={{ position: 'relative', width: '100%', height: '550px', background: 'radial-gradient(circle at 50% 50%, rgba(255, 107, 53, 0.08) 0%, transparent 70%)', borderRadius: '20px', overflow: 'hidden', border: '1px solid var(--border-subtle)' }}>
      {!loaded && !error && (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justify: 'center', gap: '1rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', zIndex: 5 }}>
          <div className="hero-status-dot" style={{ width: '16px', height: '16px' }} />
          <span>INITIALIZING 3D ROBOT CORE...</span>
        </div>
      )}

      {error ? (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justify: 'center', color: 'var(--accent-coral)', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
          [3D Scene Offline] — Please check internet connection or Spline URL.
        </div>
      ) : (
        <spline-viewer
          url={sceneUrl}
          style={{ width: '100%', height: '100%', display: loaded ? 'block' : 'none' }}
        ></spline-viewer>
      )}

      {/* Decorative cyber corner tags */}
      <div style={{ position: 'absolute', top: '1.5rem', left: '1.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--accent-gold)', letterSpacing: '0.15em', pointerEvents: 'none', zIndex: 10 }}>
        [ 3D AI CORE // INTERACTIVE ]
      </div>
      <div style={{ position: 'absolute', bottom: '1.5rem', right: '1.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.1em', pointerEvents: 'none', zIndex: 10 }}>
        DRAG / ROTATE TO INTERACT
      </div>
    </div>
  );
}
