'use client';

import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Robot } from './Robot';

export default function Robot3D() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      className="robot-container"
      style={{
        position: 'relative',
        width: '100%',
        height: '580px',
        background: 'radial-gradient(circle at 50% 50%, rgba(0, 240, 255, 0.12) 0%, rgba(15, 17, 26, 0.95) 75%)',
        borderRadius: '24px',
        overflow: 'hidden',
        border: '1px solid rgba(0, 240, 255, 0.3)',
        boxShadow: '0 25px 60px rgba(0, 0, 0, 0.6), inset 0 0 50px rgba(0, 240, 255, 0.08)',
      }}
    >
      {mounted && (
        <Canvas
          shadows
          gl={{ antialias: true, alpha: true }}
          style={{ width: '100%', height: '100%', display: 'block' }}
        >
          <PerspectiveCamera makeDefault position={[0, 0, 5.2]} fov={42} />

          {/* Studio Lighting for High-Contrast Cyber Metal & Neon Cyan Accents */}
          <ambientLight intensity={1.5} />
          <directionalLight position={[6, 8, 6]} intensity={2.4} castShadow color="#ffffff" />
          <directionalLight position={[-6, -4, -4]} intensity={1.4} color="#00f0ff" />
          <pointLight position={[0, 2, 4]} intensity={1.8} color="#00f0ff" />

          <Suspense fallback={null}>
            <group position={[0, 0.15, 0]} scale={[1.15, 1.15, 1.15]}>
              <Robot />
            </group>
          </Suspense>

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            maxPolarAngle={Math.PI / 2 + 0.15}
            minPolarAngle={Math.PI / 2 - 0.4}
          />
        </Canvas>
      )}

      {/* Decorative cyber corner tags - SLEEK DARK OBSIDIAN THEME */}
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
        [ AI CYBERNETIC CORE // ARYAN SHAKYA x VOTIV LABS ]
      </div>
      <div
        style={{
          position: 'absolute',
          bottom: '1.5rem',
          right: '1.8rem',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.75rem',
          color: '#00F0FF',
          fontWeight: 700,
          letterSpacing: '0.1em',
          pointerEvents: 'none',
          zIndex: 25,
        }}
      >
        ● CURSOR GAZE ACTIVE
      </div>
    </div>
  );
}
