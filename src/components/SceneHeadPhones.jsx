import { Canvas } from "@react-three/fiber";
import { HeadPhone } from "./HeadPhoneModel";
import { Environment, ScrollControls } from "@react-three/drei";
import * as THREE from "three";
import { Suspense } from "react";

const SceneHeadPhones = () => {
  return (
    <Canvas
      camera={{ fov: 65, position: [0, 0, 8.3] }}
      gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
    >
      <ScrollControls pages={6} damping={0.25}>
        <Suspense fallback={<div className="">Loading...</div>}>
        <HeadPhone />
        </Suspense>
      </ScrollControls>
      
      <ambientLight intensity={1.6} />
      <Environment files={"./models/abandoned_tiled_room_1k.hdr"} />
    </Canvas>
  );
};

export default SceneHeadPhones;
