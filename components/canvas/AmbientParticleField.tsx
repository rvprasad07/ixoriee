"use client";

import React, { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function ParticleNodes({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  const count = 180;
  const meshRef = useRef<THREE.Points>(null);
  const linesGeometryRef = useRef<THREE.BufferGeometry>(null);

  // Generate particle positions and connections
  const [positions, initialPositions] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const initial = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 22;
      const y = (Math.random() - 0.5) * 14;
      const z = (Math.random() - 0.5) * 10;
      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
      initial[i * 3] = x;
      initial[i * 3 + 1] = y;
      initial[i * 3 + 2] = z;
    }
    return [pos, initial];
  }, [count]);

  const [linePositions] = useMemo(() => {
    // Allocate space for connecting lines between close nodes
    return [new Float32Array(count * count * 6)];
  }, [count]);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime() * 0.4;
    const posAttr = meshRef.current.geometry.attributes.position;
    const posArray = posAttr.array as Float32Array;

    // Subtle drift + cursor reactivity
    const targetX = mousePosition.x * 3;
    const targetY = mousePosition.y * 3;

    let lineIndex = 0;
    const maxDistance = 2.4;

    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      const iy = i * 3 + 1;
      const iz = i * 3 + 2;

      // Base organic floating motion
      posArray[ix] = initialPositions[ix] + Math.sin(time + initialPositions[iy]) * 0.35 + targetX * 0.15;
      posArray[iy] = initialPositions[iy] + Math.cos(time + initialPositions[ix]) * 0.35 + targetY * 0.15;
      posArray[iz] = initialPositions[iz] + Math.sin(time * 0.5 + i) * 0.2;

      // Calculate connections for lines between nearby particles
      for (let j = i + 1; j < count; j++) {
        const jx = j * 3;
        const jy = j * 3 + 1;
        const jz = j * 3 + 2;

        const dx = posArray[ix] - posArray[jx];
        const dy = posArray[iy] - posArray[jy];
        const dz = posArray[iz] - posArray[jz];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < maxDistance && lineIndex < linePositions.length - 6) {
          linePositions[lineIndex++] = posArray[ix];
          linePositions[lineIndex++] = posArray[iy];
          linePositions[lineIndex++] = posArray[iz];
          linePositions[lineIndex++] = posArray[jx];
          linePositions[lineIndex++] = posArray[jy];
          linePositions[lineIndex++] = posArray[jz];
        }
      }
    }

    posAttr.needsUpdate = true;

    if (linesGeometryRef.current) {
      linesGeometryRef.current.setAttribute(
        "position",
        new THREE.BufferAttribute(linePositions.subarray(0, lineIndex), 3)
      );
    }
  });

  return (
    <group>
      {/* Node Points */}
      <points ref={meshRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={count}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.12}
          color="#00F0FF"
          transparent
          opacity={0.85}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Atmospheric Connection Lines */}
      <lineSegments>
        <bufferGeometry ref={linesGeometryRef} />
        <lineBasicMaterial
          color="#2E62FF"
          transparent
          opacity={0.18}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}

export const AmbientParticleField: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  if (!isClient) {
    return (
      <div className="absolute inset-0 bg-[#08080A] pointer-events-none" />
    );
  }

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        dpr={[1, 1.5]}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.5} />
        <ParticleNodes mousePosition={mousePosition} />
      </Canvas>
    </div>
  );
};
