import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import React from "react";
import { Warrior } from "./model/Warrior";

const Scene3DModelCharacter = () => {
  return (
    <>
      <div className="container bg-dark">
        <Canvas
          shadows
          camera={{ position: [-20, 10, 25], fov: 90 }}
          gl={{
            antialias: true,
            powerPreference: "high-performance",
          }}
          receiveShadow={true}
        >
          <Warrior />
          <mesh
            rotation-x={Math.PI * 1.5}
            position={[0, 0, 0]}
            receiveShadow={true}
          >
            <planeGeometry args={[50, 50, 50]} />
            <meshStandardMaterial color={"gray"} />
          </mesh>
          <OrbitControls />
          <Environment files={"./snowy_park_01_1k.hdr"} />
          <ambientLight intensity={0.5} />
          <directionalLight
            position={[10, 10, 0]}
            intensity={1}
            castShadow
            />
        </Canvas>
      </div>
    </>
  );
};

export default Scene3DModelCharacter;
