import { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Greeting wave animation phases
type WavePhase = 'idle' | 'raise' | 'wave' | 'lower'

export function Robot() {
  const robotGroupRef = useRef<THREE.Group>(null)
  const headGroupRef = useRef<THREE.Group>(null)
  const rightArmGroupRef = useRef<THREE.Group>(null)
  const rightForearmGroupRef = useRef<THREE.Group>(null)
  const leftArmGroupRef = useRef<THREE.Group>(null)
  const leftForearmGroupRef = useRef<THREE.Group>(null)
  const leftEyeRef = useRef<THREE.Mesh>(null)
  const rightEyeRef = useRef<THREE.Mesh>(null)
  const torsoRef = useRef<THREE.Mesh>(null)
  const chestRingRef = useRef<THREE.Mesh>(null)
  const leftEarGlowRef = useRef<THREE.Mesh>(null)
  const rightEarGlowRef = useRef<THREE.Mesh>(null)

  // Mouse tracking
  const mouseRef = useRef({ x: 0, y: 0 })
  const smoothMouseRef = useRef({ x: 0, y: 0 })

  // Wave animation state
  const waveStateRef = useRef({
    phase: 'idle' as WavePhase,
    phaseTimer: 0,
    cycleDelay: 2.0,
    waveCount: 0,
  })

  // Glow color state
  const glowRef = useRef({
    currentColor: new THREE.Color('#00f0ff'),
    targetColor: new THREE.Color('#00f0ff'),
    intensity: 1.0,
  })

  // Handle mouse move
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Shared Materials
  const bodyMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#2a2a2a',
    metalness: 0.85,
    roughness: 0.15,
  }), [])

  const bodyLightMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#3d3d3d',
    metalness: 0.7,
    roughness: 0.25,
  }), [])

  const blackMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#1a1a1a',
    metalness: 0.5,
    roughness: 0.4,
  }), [])

  const faceMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#050505',
    metalness: 0.1,
    roughness: 0.05,
  }), [])

  // Shared glow material - updates all glowing parts in sync
  const glowMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#00f0ff',
    emissive: '#00f0ff',
    emissiveIntensity: 1.2,
    toneMapped: false,
  }), [])

  // Generate 3D LED smile spheres (7 spheres in an arc)
  const smileSpheres = useMemo(() => {
    const spheres = []
    const count = 7
    const radius = 0.22
    for (let i = 0; i < count; i++) {
      const angle = Math.PI * 0.2 + (i / (count - 1)) * Math.PI * 0.6
      const x = Math.sin(angle - Math.PI / 2) * radius
      const y = -Math.cos(angle - Math.PI / 2) * radius * 0.6 - 0.05
      spheres.push({ x, y })
    }
    return spheres
  }, [])

  // Animation loop
  useFrame((_, delta) => {
    const time = performance.now() / 1000
    const dt = Math.min(delta, 0.05)

    // Smooth mouse damping
    smoothMouseRef.current.x += (mouseRef.current.x - smoothMouseRef.current.x) * 0.15
    smoothMouseRef.current.y += (mouseRef.current.y - smoothMouseRef.current.y) * 0.15

    // Head tracking towards cursor (FIXED Y-AXIS INVERSION!)
    if (headGroupRef.current) {
      const targetRotX = -smoothMouseRef.current.y * 0.45
      const targetRotY = smoothMouseRef.current.x * 0.65
      headGroupRef.current.rotation.x += (targetRotX - headGroupRef.current.rotation.x) * 0.15
      headGroupRef.current.rotation.y += (targetRotY - headGroupRef.current.rotation.y) * 0.15
    }

    // 3D Eye Blinking & Cursor Tracking
    const blinkCycle = time % 3.5
    const isBlinking = blinkCycle > 3.3 && blinkCycle < 3.45
    const targetEyeScaleY = isBlinking ? 0.08 : 1.0

    if (leftEyeRef.current) {
      leftEyeRef.current.scale.y += (targetEyeScaleY - leftEyeRef.current.scale.y) * 0.3
      leftEyeRef.current.position.x = -0.22 + smoothMouseRef.current.x * 0.04
      leftEyeRef.current.position.y = 0.16 + smoothMouseRef.current.y * 0.04
    }
    if (rightEyeRef.current) {
      rightEyeRef.current.scale.y += (targetEyeScaleY - rightEyeRef.current.scale.y) * 0.3
      rightEyeRef.current.position.x = 0.22 + smoothMouseRef.current.x * 0.04
      rightEyeRef.current.position.y = 0.16 + smoothMouseRef.current.y * 0.04
    }

    // Floating body animation
    if (robotGroupRef.current) {
      robotGroupRef.current.position.y = Math.sin(time * 1.5) * 0.08
      robotGroupRef.current.rotation.y = smoothMouseRef.current.x * 0.2
      robotGroupRef.current.rotation.x = -smoothMouseRef.current.y * 0.08
    }

    // Breathing torso
    if (torsoRef.current) {
      const breath = Math.sin(time * 1.8) * 0.02 + 1
      torsoRef.current.scale.set(1.15 * breath, 1.0, 0.85 * breath)
    }

    // Left Arm: Subtle natural breathing & safe mouse reaching (no clipping!)
    if (leftArmGroupRef.current) {
      const swayZ = 0.08 + Math.sin(time * 1.2) * 0.04
      const reachX = Math.max(-0.2, Math.min(0.2, -smoothMouseRef.current.y * 0.15))
      const reachY = Math.max(-0.1, Math.min(0.1, smoothMouseRef.current.x * 0.1))
      leftArmGroupRef.current.rotation.z += (swayZ - leftArmGroupRef.current.rotation.z) * 0.1
      leftArmGroupRef.current.rotation.x += (reachX - leftArmGroupRef.current.rotation.x) * 0.1
      leftArmGroupRef.current.rotation.y += (reachY - leftArmGroupRef.current.rotation.y) * 0.1
    }
    if (leftForearmGroupRef.current) {
      const flex = Math.sin(time * 2.5) * 0.1 - 0.2
      leftForearmGroupRef.current.rotation.x += (flex - leftForearmGroupRef.current.rotation.x) * 0.1
      leftForearmGroupRef.current.rotation.z = Math.cos(time * 2.0) * 0.04
    }

    // Right Arm: Wave animation state machine
    const waveState = waveStateRef.current
    waveState.phaseTimer += dt

    if (waveState.phase === 'idle') {
      glowRef.current.targetColor.set('#00f0ff')
      if (rightArmGroupRef.current) {
        const swayZ = -0.08 - Math.sin(time * 1.2 + 1) * 0.04
        const reachX = Math.max(-0.2, Math.min(0.2, -smoothMouseRef.current.y * 0.15))
        const reachY = Math.max(-0.1, Math.min(0.1, smoothMouseRef.current.x * 0.1))
        rightArmGroupRef.current.rotation.z += (swayZ - rightArmGroupRef.current.rotation.z) * 0.1
        rightArmGroupRef.current.rotation.x += (reachX - rightArmGroupRef.current.rotation.x) * 0.1
        rightArmGroupRef.current.rotation.y += (reachY - rightArmGroupRef.current.rotation.y) * 0.1
      }
      if (rightForearmGroupRef.current) {
        const flex = Math.sin(time * 2.5 + 1) * 0.1 - 0.2
        rightForearmGroupRef.current.rotation.x += (flex - rightForearmGroupRef.current.rotation.x) * 0.1
        rightForearmGroupRef.current.rotation.z = 0
      }
      if (waveState.phaseTimer >= waveState.cycleDelay) {
        waveState.phase = 'raise'
        waveState.phaseTimer = 0
        waveState.cycleDelay = 3.5
      }
    } else if (waveState.phase === 'raise') {
      glowRef.current.targetColor.set('#ffbb00')
      const progress = Math.min(waveState.phaseTimer / 0.6, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      if (rightArmGroupRef.current) {
        // Swings OUTWARD and UP to the side (-1.1 rad is ~63 degrees out to the left)
        rightArmGroupRef.current.rotation.z = -0.08 + eased * (-1.02)
        rightArmGroupRef.current.rotation.x = eased * -0.4
        rightArmGroupRef.current.rotation.y = eased * -0.2
      }
      if (rightForearmGroupRef.current) {
        rightForearmGroupRef.current.rotation.x = eased * -0.6
        rightForearmGroupRef.current.rotation.z = eased * 0.6
      }
      if (progress >= 1) {
        waveState.phase = 'wave'
        waveState.phaseTimer = 0
      }
    } else if (waveState.phase === 'wave') {
      glowRef.current.targetColor.set('#ff3366')
      const waveProgress = waveState.phaseTimer / 1.8
      if (rightForearmGroupRef.current) {
        const waveAngle = Math.sin(waveProgress * Math.PI * 8) * 0.35
        rightForearmGroupRef.current.rotation.x = -0.6 + Math.cos(waveProgress * Math.PI * 8) * 0.1
        rightForearmGroupRef.current.rotation.z = 0.6 + waveAngle
      }
      if (waveState.phaseTimer >= 1.8) {
        waveState.phase = 'lower'
        waveState.phaseTimer = 0
      }
    } else if (waveState.phase === 'lower') {
      glowRef.current.targetColor.set('#00f0ff')
      const progress = Math.min(waveState.phaseTimer / 0.7, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      if (rightArmGroupRef.current) {
        rightArmGroupRef.current.rotation.z = -1.1 * (1 - eased) + (-0.08) * eased
        rightArmGroupRef.current.rotation.x = -0.4 * (1 - eased)
        rightArmGroupRef.current.rotation.y = -0.2 * (1 - eased)
      }
      if (rightForearmGroupRef.current) {
        rightForearmGroupRef.current.rotation.x = -0.6 * (1 - eased)
        rightForearmGroupRef.current.rotation.z = 0.6 * (1 - eased)
      }
      if (progress >= 1) {
        waveState.phase = 'idle'
        waveState.phaseTimer = 0
      }
    }

    // Update shared glow material smoothly
    glowRef.current.currentColor.lerp(glowRef.current.targetColor, 0.08)
    glowRef.current.intensity = 1.0 + Math.sin(time * 3) * 0.3
    glowMaterial.emissive.copy(glowRef.current.currentColor)
    glowMaterial.emissiveIntensity = glowRef.current.intensity
  })

  return (
    <group ref={robotGroupRef} position={[0, 0, 0]}>
      {/* HEAD GROUP - pivots for mouse tracking */}
      <group ref={headGroupRef} position={[0, 0, 0]}>
        {/* Outer helmet */}
        <mesh position={[0, 0, 0]} scale={[1, 0.95, 1]} castShadow>
          <sphereGeometry args={[0.9, 64, 64]} />
          <primitive object={bodyMaterial} attach="material" />
        </mesh>

        {/* Face screen visor */}
        <mesh position={[0, 0, 0.15]} castShadow>
          <sphereGeometry args={[0.72, 64, 64]} />
          <primitive object={faceMaterial} attach="material" />
        </mesh>

        {/* OLED SCREEN EYES (^_^ style) - rendered with clean glowing Line ribbons! */}
        {/* 3D GLOWING EYES - capsules that track cursor and blink! */}
        <mesh ref={leftEyeRef} position={[-0.22, 0.16, 0.84]} rotation={[0, 0, 0]}>
          <capsuleGeometry args={[0.06, 0.12, 16, 16]} />
          <primitive object={glowMaterial} attach="material" />
        </mesh>
        <mesh ref={rightEyeRef} position={[0.22, 0.16, 0.84]} rotation={[0, 0, 0]}>
          <capsuleGeometry args={[0.06, 0.12, 16, 16]} />
          <primitive object={glowMaterial} attach="material" />
        </mesh>

        {/* 3D GLOWING LED SMILE MATRIX */}
        {smileSpheres.map((pos, i) => (
          <mesh key={i} position={[pos.x, pos.y, 0.85]}>
            <sphereGeometry args={[0.038, 16, 16]} />
            <primitive object={glowMaterial} attach="material" />
          </mesh>
        ))}

        {/* Left ear */}
        <group position={[-0.95, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <mesh castShadow>
            <capsuleGeometry args={[0.15, 0.6, 8, 16]} />
            <primitive object={bodyMaterial} attach="material" />
          </mesh>
          <mesh ref={leftEarGlowRef} position={[0, 0, 0.14]}>
            <boxGeometry args={[0.05, 0.4, 0.01]} />
            <primitive object={glowMaterial} attach="material" />
          </mesh>
        </group>

        {/* Right ear */}
        <group position={[0.95, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
          <mesh castShadow>
            <capsuleGeometry args={[0.15, 0.6, 8, 16]} />
            <primitive object={bodyMaterial} attach="material" />
          </mesh>
          <mesh ref={rightEarGlowRef} position={[0, 0, 0.14]}>
            <boxGeometry args={[0.05, 0.4, 0.01]} />
            <primitive object={glowMaterial} attach="material" />
          </mesh>
        </group>
      </group>

      {/* Neck */}
      <mesh position={[0, -1.0, 0]} castShadow>
        <cylinderGeometry args={[0.2, 0.2, 0.3, 32]} />
        <primitive object={blackMaterial} attach="material" />
      </mesh>

      {/* BODY GROUP */}
      <group position={[0, 0, 0]}>
        {/* Main torso */}
        <mesh ref={torsoRef} position={[0, -1.9, 0]} scale={[1.15, 1.0, 0.85]} castShadow>
          <sphereGeometry args={[0.85, 64, 64]} />
          <primitive object={bodyMaterial} attach="material" />
        </mesh>

        {/* Glowing Chest ring */}
        <mesh ref={chestRingRef} position={[0, -1.7, 0.72]}>
          <torusGeometry args={[0.35, 0.06, 16, 64]} />
          <primitive object={glowMaterial} attach="material" />
        </mesh>

        {/* Lower body */}
        <mesh position={[0, -2.7, 0]} scale={[1.0, 0.8, 0.8]} castShadow>
          <sphereGeometry args={[0.65, 64, 64]} />
          <primitive object={blackMaterial} attach="material" />
        </mesh>
      </group>

      {/* RIGHT ARM - attached cleanly to body, swings outward to wave */}
      <group ref={rightArmGroupRef} position={[-0.95, -1.5, 0]}>
        <mesh castShadow>
          <sphereGeometry args={[0.22, 32, 32]} />
          <primitive object={bodyMaterial} attach="material" />
        </mesh>
        <group position={[-0.2, -0.3, 0]} rotation={[0, 0, 0.3]}>
          <mesh castShadow>
            <capsuleGeometry args={[0.14, 0.6, 8, 16]} />
            <primitive object={bodyLightMaterial} attach="material" />
          </mesh>
          <group position={[0, -0.45, 0]}>
            <mesh castShadow>
              <sphereGeometry args={[0.16, 32, 32]} />
              <primitive object={bodyMaterial} attach="material" />
            </mesh>
            <group ref={rightForearmGroupRef} position={[0, 0, 0]}>
              <mesh position={[-0.1, -0.35, 0.15]} rotation={[-0.5, 0, 0.2]} castShadow>
                <capsuleGeometry args={[0.12, 0.55, 8, 16]} />
                <primitive object={bodyLightMaterial} attach="material" />
              </mesh>
              <mesh position={[-0.15, -0.65, 0.3]} castShadow>
                <boxGeometry args={[0.2, 0.25, 0.12]} />
                <primitive object={bodyMaterial} attach="material" />
              </mesh>
              {[-0.08, 0, 0.08].map((offset, i) => (
                <mesh key={i} position={[-0.15 + offset * 0.5, -0.82, 0.35]} rotation={[0.3, 0, 0]}>
                  <capsuleGeometry args={[0.03, 0.14, 4, 8]} />
                  <primitive object={blackMaterial} attach="material" />
                </mesh>
              ))}
            </group>
          </group>
        </group>
      </group>

      {/* LEFT ARM - attached cleanly to body, subtle breathing & reaching */}
      <group ref={leftArmGroupRef} position={[0.95, -1.5, 0]}>
        <mesh castShadow>
          <sphereGeometry args={[0.22, 32, 32]} />
          <primitive object={bodyMaterial} attach="material" />
        </mesh>
        <group position={[0.2, -0.3, 0]} rotation={[0, 0, -0.3]}>
          <mesh castShadow>
            <capsuleGeometry args={[0.14, 0.6, 8, 16]} />
            <primitive object={bodyLightMaterial} attach="material" />
          </mesh>
          <group position={[0, -0.45, 0]}>
            <mesh castShadow>
              <sphereGeometry args={[0.16, 32, 32]} />
              <primitive object={bodyMaterial} attach="material" />
            </mesh>
            <group ref={leftForearmGroupRef} position={[0, 0, 0]}>
              <mesh position={[0.1, -0.35, 0.15]} rotation={[-0.5, 0, -0.2]} castShadow>
                <capsuleGeometry args={[0.12, 0.55, 8, 16]} />
                <primitive object={bodyLightMaterial} attach="material" />
              </mesh>
              <mesh position={[0.15, -0.65, 0.3]} castShadow>
                <boxGeometry args={[0.2, 0.25, 0.12]} />
                <primitive object={bodyMaterial} attach="material" />
              </mesh>
              {[-0.08, 0, 0.08].map((offset, i) => (
                <mesh key={i} position={[0.15 + offset * 0.5, -0.82, 0.35]} rotation={[0.3, 0, 0]}>
                  <capsuleGeometry args={[0.03, 0.14, 4, 8]} />
                  <primitive object={blackMaterial} attach="material" />
                </mesh>
              ))}
            </group>
          </group>
        </group>
      </group>
    </group>
  )
}
