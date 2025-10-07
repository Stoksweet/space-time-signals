import { Canvas } from '@react-three/fiber';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group } from 'three';

// Individual Billboard Component
const Billboard = ({ position }: { position: [number, number, number] }) => {
  const meshRef = useRef<Group>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      // Gentle floating and rotation in space
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3 + position[0]) * 0.15;
      meshRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.2 + position[1]) * 0.1;
      
      // Slower floating motion
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.3 + position[0]) * 0.3;
      meshRef.current.position.x = position[0] + Math.cos(state.clock.elapsedTime * 0.2 + position[2]) * 0.2;
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

// Grid of Billboards in Space
const BillboardGrid = () => {
  const billboards = [];
  
  // Create spread out billboard grid
  for (let x = -10; x <= 10; x += 10) {
    for (let y = -6; y <= 6; y += 6) {
      for (let z = -18; z <= -6; z += 6) {
        billboards.push(
          <Billboard 
            key={`${x}-${y}-${z}`} 
            position={[x, y, z]} 
          />
        );
      }
    }
  }
  
  return <>{billboards}</>;
};

// Main Background Component
export const TVScreensBackground = () => {
  return (
    <div className="absolute inset-0 opacity-10">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 75 }}
        gl={{ alpha: true, antialias: true }}
      >
        {/* Space-themed Lighting */}
        <ambientLight intensity={0.2} />
        <directionalLight position={[10, 10, 5]} intensity={0.6} color="#0088ff" />
        <directionalLight position={[-10, -10, -5]} intensity={0.4} color="#6366f1" />
        <pointLight position={[0, 0, 5]} intensity={0.3} color="#0066cc" />
        
        {/* Billboard Grid */}
        <BillboardGrid />
      </Canvas>
    </div>
  );
};