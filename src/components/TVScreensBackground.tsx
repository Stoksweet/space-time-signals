import { Canvas } from '@react-three/fiber';
import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group } from 'three';
import * as THREE from 'three';

// Individual Billboard Component
const Billboard = ({ position, mousePosition }: { position: [number, number, number], mousePosition: { x: number, y: number } }) => {
  const meshRef = useRef<Group>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      // Mouse-based parallax movement (fly-by effect)
      const parallaxStrength = 0.5;
      meshRef.current.position.x = position[0] + mousePosition.x * parallaxStrength * (1 + position[2] * 0.1);
      meshRef.current.position.y = position[1] - mousePosition.y * parallaxStrength * (1 + position[2] * 0.1);
      
      // Gentle rotation based on mouse
      meshRef.current.rotation.y = mousePosition.x * 0.3 + Math.sin(state.clock.elapsedTime * 0.3 + position[0]) * 0.1;
      meshRef.current.rotation.x = -mousePosition.y * 0.2 + Math.cos(state.clock.elapsedTime * 0.2 + position[1]) * 0.05;
    }
  });

  return (
    <group ref={meshRef} position={position}>
      {/* Billboard Frame/Structure */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[3.5, 2, 0.15]} />
        <meshStandardMaterial 
          color="#0a0a0a" 
          metalness={0.8}
          roughness={0.2}
          transparent 
          opacity={0.4}
        />
      </mesh>
      
      {/* Billboard Screen/Display */}
      <mesh position={[0, 0, 0.08]}>
        <boxGeometry args={[3.2, 1.8, 0.05]} />
        <meshStandardMaterial 
          color="#0066cc" 
          emissive="#003366"
          emissiveIntensity={0.3}
          transparent
          opacity={0.5}
        />
      </mesh>
      
      {/* Glow Effect */}
      <mesh position={[0, 0, 0.12]}>
        <boxGeometry args={[3.3, 1.9, 0.01]} />
        <meshStandardMaterial 
          color="#0088ff" 
          transparent 
          opacity={0.08}
          emissive="#0066cc"
          emissiveIntensity={0.1}
        />
      </mesh>
      
      {/* Support Structure - Left */}
      <mesh position={[-1.8, -1.2, -0.1]}>
        <boxGeometry args={[0.1, 0.6, 0.1]} />
        <meshStandardMaterial 
          color="#1a1a1a" 
          metalness={0.7}
          transparent 
          opacity={0.3}
        />
      </mesh>
      
      {/* Support Structure - Right */}
      <mesh position={[1.8, -1.2, -0.1]}>
        <boxGeometry args={[0.1, 0.6, 0.1]} />
        <meshStandardMaterial 
          color="#1a1a1a" 
          metalness={0.7}
          transparent 
          opacity={0.3}
        />
      </mesh>
    </group>
  );
};

// Stars Component
const Stars = () => {
  const starsRef = useRef<THREE.Points>(null);
  
  const starPositions = new Float32Array(1000 * 3);
  for (let i = 0; i < 1000; i++) {
    starPositions[i * 3] = (Math.random() - 0.5) * 100;
    starPositions[i * 3 + 1] = (Math.random() - 0.5) * 100;
    starPositions[i * 3 + 2] = (Math.random() - 0.5) * 100;
  }
  
  useFrame((state) => {
    if (starsRef.current) {
      starsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });
  
  return (
    <points ref={starsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={1000}
          array={starPositions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.1} color="#ffffff" transparent opacity={0.8} />
    </points>
  );
};

// Grid of Billboards in Space
const BillboardGrid = ({ mousePosition }: { mousePosition: { x: number, y: number } }) => {
  const billboards = [];
  
  // Create spread out billboard grid
  for (let x = -10; x <= 10; x += 10) {
    for (let y = -6; y <= 6; y += 6) {
      for (let z = -18; z <= -6; z += 6) {
        billboards.push(
          <Billboard 
            key={`${x}-${y}-${z}`} 
            position={[x, y, z]}
            mousePosition={mousePosition}
          />
        );
      }
    }
  }
  
  return <>{billboards}</>;
};

// Main Background Component
export const TVScreensBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = -(e.clientY / window.innerHeight) * 2 + 1;
    setMousePosition({ x, y });
  };
  
  return (
    <div 
      className="absolute inset-0 opacity-15"
      onMouseMove={handleMouseMove}
    >
      <Canvas
        camera={{ position: [0, 0, 10], fov: 75 }}
        gl={{ alpha: true, antialias: true }}
      >
        {/* Space-themed Lighting */}
        <ambientLight intensity={0.15} />
        <directionalLight position={[10, 10, 5]} intensity={0.4} color="#0088ff" />
        <directionalLight position={[-10, -10, -5]} intensity={0.3} color="#6366f1" />
        <pointLight position={[0, 0, 5]} intensity={0.2} color="#0066cc" />
        
        {/* Stars */}
        <Stars />
        
        {/* Billboard Grid */}
        <BillboardGrid mousePosition={mousePosition} />
      </Canvas>
    </div>
  );
};