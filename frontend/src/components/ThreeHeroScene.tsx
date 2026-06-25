"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Float, Sphere, Trail } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function NeuralNode({ position, color }: { position: [number, number, number], color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y += Math.sin(state.clock.elapsedTime + position[0]) * 0.002;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <Trail width={0.5} color={color} length={2} decay={1}>
        <Sphere ref={meshRef} args={[0.05, 16, 16]} position={position}>
          <meshBasicMaterial color={color} toneMapped={false} />
        </Sphere>
      </Trail>
    </Float>
  );
}

export default function ThreeHeroScene() {
  const nodes = [
    { pos: [-2, 1, -2], color: "#6366f1" }, // Indigo
    { pos: [2, 0, -1], color: "#a855f7" },  // Purple
    { pos: [-1, -1, -3], color: "#06b6d4" }, // Cyan
    { pos: [1, 2, -4], color: "#6366f1" },
    { pos: [3, 1, -2], color: "#a855f7" },
  ];

  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 5]} intensity={1} />

      <Stars radius={50} depth={50} count={3000} factor={4} saturation={1} fade speed={1.5} />

      {nodes.map((node, i) => (
        <NeuralNode key={i} position={node.pos as [number, number, number]} color={node.color} />
      ))}
    </Canvas>
  );
}
