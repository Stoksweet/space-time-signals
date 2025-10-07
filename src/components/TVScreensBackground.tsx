import { Canvas } from '@react-three/fiber';
import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group } from 'three';
import * as THREE from 'three';

// Individual Billboard Component with vibrant colors
const Billboard = ({ position, mousePosition, color }: { 
  position: [number, number, number], 
  mousePosition: { x: number, y: number },
  color: string
}) => {
  const meshRef = useRef<Group>(null);
  const initialZ = position[2];
  
  useFrame((state) => {
    if (meshRef.current) {
      // Forward movement (flying through space)
      meshRef.current.position.z = (initialZ + (state.clock.elapsedTime * 1.5) % 30) - 15;
      
      // Reset position when too close
      if (meshRef.current.position.z > 5) {
        meshRef.current.position.z = initialZ - 30;
      }
      
      // Mouse-based parallax movement (fly-by effect)
      const parallaxStrength = 0.5;
      meshRef.current.position.x = position[0] + mousePosition.x * parallaxStrength * (1 + Math.abs(meshRef.current.position.z) * 0.05);
      meshRef.current.position.y = position[1] - mousePosition.y * parallaxStrength * (1 + Math.abs(meshRef.current.position.z) * 0.05);
      
      // Gentle rotation based on mouse and movement
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
      
      {/* Billboard Screen/Display - Bright with logo colors */}
      <mesh position={[0, 0, 0.08]}>
        <boxGeometry args={[3.2, 1.8, 0.05]} />
        <meshStandardMaterial 
          color={color} 
          emissive={color}
          emissiveIntensity={0.8}
          transparent
          opacity={0.9}
        />
      </mesh>
      
      {/* Glow Effect */}
      <mesh position={[0, 0, 0.12]}>
        <boxGeometry args={[3.4, 2.0, 0.01]} />
        <meshStandardMaterial 
          color={color} 
          transparent 
          opacity={0.3}
          emissive={color}
          emissiveIntensity={0.6}
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

// Stars Component with forward movement
const Stars = () => {
  const starsRef = useRef<THREE.Points>(null);
  
  const starCount = 2000;
  const starPositions = new Float32Array(starCount * 3);
  const starSpeeds = new Float32Array(starCount);
  
  for (let i = 0; i < starCount; i++) {
    starPositions[i * 3] = (Math.random() - 0.5) * 200;
    starPositions[i * 3 + 1] = (Math.random() - 0.5) * 200;
    starPositions[i * 3 + 2] = (Math.random() - 0.5) * 100 - 50;
    starSpeeds[i] = Math.random() * 0.5 + 0.5;
  }
  
  useFrame((state) => {
    if (starsRef.current) {
      const positions = starsRef.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < starCount; i++) {
        // Move stars forward
        positions[i * 3 + 2] += starSpeeds[i] * 0.3;
        
        // Reset star position when it passes the camera
        if (positions[i * 3 + 2] > 10) {
          positions[i * 3 + 2] = -50;
          positions[i * 3] = (Math.random() - 0.5) * 200;
          positions[i * 3 + 1] = (Math.random() - 0.5) * 200;
        }
      }
      
      starsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });
  
  return (
    <points ref={starsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={starCount}
          array={starPositions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.15} color="#ffffff" transparent opacity={0.9} sizeAttenuation />
    </points>
  );
};

// Grid of Billboards in Space with logo colors
const BillboardGrid = ({ mousePosition }: { mousePosition: { x: number, y: number } }) => {
  const billboards = [];
  
  // Logo colors - vibrant green, red, blue, yellow
  const colors = ['#2d7a4f', '#e63946', '#457b9d', '#f4a261'];
  
  let colorIndex = 0;
  
  // Create more spread out billboard grid
  for (let x = -20; x <= 20; x += 13) {
    for (let y = -10; y <= 10; y += 10) {
      for (let z = -30; z <= -10; z += 10) {
        billboards.push(
          <Billboard 
            key={`${x}-${y}-${z}`} 
            position={[x, y, z]}
            mousePosition={mousePosition}
            color={colors[colorIndex % colors.length]}
          />
        );
        colorIndex++;
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
        {/* Space-themed Lighting - brighter for vibrant billboards */}
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 10, 5]} intensity={0.6} color="#ffffff" />
        <directionalLight position={[-10, -10, -5]} intensity={0.4} color="#ffffff" />
        <pointLight position={[0, 0, 5]} intensity={0.5} color="#ffffff" />
        
        {/* Stars */}
        <Stars />
        
        {/* Billboard Grid */}
        <BillboardGrid mousePosition={mousePosition} />
      </Canvas>
    </div>
  );
};