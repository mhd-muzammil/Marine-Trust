// src/components/ThreeScene.jsx
import React, { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  useGLTF,
  useAnimations,
  Environment,
} from "@react-three/drei";
import * as THREE from "three";

function Fish({ modelPath = "/models/fish.glb", index = 0 }) {
  const group = useRef();
  const { scene, animations } = useGLTF(modelPath);
  const { actions, mixer } = useAnimations(animations, group);

  // Initial scale/rotation so the model is visible
  scene.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  // If GLB has an animation clip, play the first one
  React.useEffect(() => {
    if (actions && Object.keys(actions).length > 0) {
      // play every animation clip once (or pick by name)
      Object.values(actions).forEach((a) => {
        a.reset().fadeIn(0.3).play();
      });
    }
    return () => {
      if (mixer) mixer.stopAllAction();
    };
  }, [actions, mixer]);

  // Swim motion parameters (sinusoidal + forward movement)
  const swimSpeed = 0.6 + 0.15 * index;
  const amplitude = 0.35 + 0.05 * index;
  const yawAmplitude = 0.6;

  useFrame((state, delta) => {
    if (!group.current) return;

    // forward movement (slow)
    group.current.position.x += delta * swimSpeed * 0.2;
    // side-to-side wave
    group.current.position.y =
      Math.sin(state.clock.elapsedTime * swimSpeed + index) * amplitude - 0.6;
    // gentle yaw (rotate around Y)
    group.current.rotation.y =
      Math.sin(state.clock.elapsedTime * swimSpeed * 0.6 + index) *
      yawAmplitude *
      0.15;
    // small pitch bob
    group.current.rotation.x =
      Math.sin(state.clock.elapsedTime * swimSpeed * 0.4 + index) * 0.05;
  });

  return (
    <group ref={group} scale={0.6} position={[-0.5 + index * 0.4, -0.6, -1]}>
      <primitive object={scene} />
    </group>
  );
}

export default function ThreeScene() {
  // If multiple fish wanted, render multiple <Fish index={i} />
  return (
    <Canvas shadows camera={{ position: [0, 0.5, 3], fov: 50 }}>
      <fog attach="fog" args={["#0b2233", 2, 8]} />
      <ambientLight intensity={0.35} />
      <directionalLight
        castShadow
        position={[5, 5, 5]}
        intensity={1}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <Suspense fallback={null}>
        {/* Environment helps reflections & lighting */}
        <Environment preset="sunset" />

        {/* Sea floor */}
        <mesh receiveShadow rotation-x={-Math.PI / 2} position={[0, -1.5, 0]}>
          <planeGeometry args={[30, 30]} />
          <meshStandardMaterial roughness={1} color="#0b2a33" />
        </mesh>

        {/* One or more fish */}
        <Fish modelPath="/models/fish.glb" index={0} />
        <Fish modelPath="/models/fish.glb" index={1} />
        <Fish modelPath="/models/fish.glb" index={2} />
      </Suspense>

      <OrbitControls enablePan={true} enableZoom={true} />
    </Canvas>
  );
}
