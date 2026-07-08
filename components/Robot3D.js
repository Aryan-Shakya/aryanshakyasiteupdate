'use client';

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Robot } from './Robot';

export default function Robot3D() {
  return (
    <div
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
      <Canvas
        shadows
        gl={{ antialias: true, alpha: true }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 7]} fov={45} />
        <ambientLight intensity={0.7} />
        <directionalLight position={[10, 10, 10]} intensity={1.5} castShadow color="#ffffff" />
        <directionalLight position={[-10, -10, -5]} intensity={0.8} color="#00f0ff" />
        <pointLight position={[0, 2, 4]} intensity={1.2} color="#00f0ff" />

        <Suspense fallback={null}>
          <group position={[0, 0.6, 0]}>
            <Robot />
          </group>
        </Suspense>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2 + 0.2}
          minPolarAngle={Math.PI / 2 - 0.5}
        />
      </Canvas>

      {/* Decorative cyber corner tags - ZERO WATERMARKS */}
      <div
        style={{
          position: 'absolute',
          top: '1.5rem',
          left: '1.5rem',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.7rem',
          color: 'var(--accent-cyan)',
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
          color: 'var(--text-secondary)',
          letterSpacing: '0.1em',
          pointerEvents: 'none',
          zIndex: 10,
        }}
      >
        MOVE CURSOR OR DRAG TO ROTATE
      </div>
    </div>
  );
}
