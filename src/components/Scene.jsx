import React from "react";
import { Canvas } from "@react-three/fiber";
import { Bottle } from "./Bottle";
import { OrbitControls, Environment, ScrollControls } from "@react-three/drei";
import "../App.css";

const Scene = () => {
  return (
    <div className={"container-3d canvas"}>
      <Canvas
      frameloop="demand"
      camera={{ fov: 35, position: [0, 2, 10] }} gl={{ antialias: true}}>
        <ambientLight intensity={0.8} color={"white"} />
        <ScrollControls pages={8} damping={0.5}>
          <Bottle position={[0, 0, 0]}/>
        </ScrollControls>

        <directionalLight position={[10, 10, 10]} intensity={8} color={"white"} />
        <OrbitControls
          target={[0, 2, 0]}
          enableZoom={false}
          enableRotate={false}
        />
        <Environment files={"./snowy_park_01_1k.hdr"} blur={0.5} />
      </Canvas>
    </div>
  );
};

export default Scene;
