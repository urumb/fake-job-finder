"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sphere, Sparkles } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function RotatingShield() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.5;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={3} rotationIntensity={0.2} floatIntensity={0.5}>
        <Sphere args={[1.5, 32, 32]}>
          <meshStandardMaterial
            color="#6366f1"
            wireframe
            transparent
            opacity={0.3}
            emissive="#6366f1"
            emissiveIntensity={0.5}
          />
        </Sphere>
        <Sphere args={[1.4, 16, 16]}>
          <meshStandardMaterial
            color="#a855f7"
            wireframe
            transparent
            opacity={0.1}
          />
        </Sphere>
      </Float>
    </group>
  );
}

export default function ThreeScannerScene() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#6366f1" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#06b6d4" />

      <RotatingShield />
      <Sparkles count={100} scale={4} size={2} speed={0.4} color="#06b6d4" />
    </Canvas>
  );
}
