import { Canvas } from '@react-three/fiber';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

// Individual TV Screen Component
const TVScreen = ({ position }: { position: [number, number, number] }) => {
  const meshRef = useRef<Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      // Gentle rotation animation
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.3;
      meshRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.3 + position[1]) * 0.2;
      
      // Floating motion
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.4 + position[0]) * 0.5;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      {/* TV Screen Frame */}
      <boxGeometry args={[1.6, 0.9, 0.1]} />
      <meshStandardMaterial 
        color="#1a1a1a" 
        transparent 
        opacity={0.3}
      />
      
      {/* Screen */}
      <mesh position={[0, 0, 0.051]}>
        <boxGeometry args={[1.4, 0.7, 0.02]} />
        <meshStandardMaterial 
          color="#0066cc" 
          emissive="#001122"
          emissiveIntensity={0.2}
          transparent
          opacity={0.4}
        />
      </mesh>
      
      {/* Screen Glow Effect */}
      <mesh position={[0, 0, 0.06]}>
        <boxGeometry args={[1.5, 0.8, 0.01]} />
        <meshStandardMaterial 
          color="#0088ff" 
          transparent 
          opacity={0.05}
          emissive="#0066cc"
          emissiveIntensity={0.05}
        />
      </mesh>
    </mesh>
  );
};

// 3x3 Grid of TV Screens
const TVGrid = () => {
  const screens = [];
  
  // Create spread out grid
  for (let x = -8; x <= 8; x += 8) {
    for (let y = -6; y <= 6; y += 6) {
      for (let z = -15; z <= -3; z += 6) {
        screens.push(
          <TVScreen 
            key={`${x}-${y}-${z}`} 
            position={[x, y, z]} 
          />
        );
      }
    }
  }
  
  return <>{screens}</>;
};

// Main Background Component
export const TVScreensBackground = () => {
  return (
    <div className="absolute inset-0 opacity-10">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 75 }}
        gl={{ alpha: true, antialias: true }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 10, 5]} intensity={0.5} color="#0088ff" />
        <directionalLight position={[-10, -10, -5]} intensity={0.3} color="#00cc44" />
        
        {/* TV Screens Grid */}
        <TVGrid />
      </Canvas>
    </div>
  );
};