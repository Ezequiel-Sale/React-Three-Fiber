import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Camera from "./Camera";
import Light from "./Light";
import { Environment } from "@react-three/drei";
import { Minecraft } from "./Minecraft";
import * as THREE from "three";
import { Suspense } from "react";

const SceneMinecraft = () => {
  return (
    <>
      <div className="bg-dark minecraft">
        <Canvas
          frameloop="demand"
          gl={{
            antialias: true,
            toneMapping: THREE.ReinhardToneMapping,
            toneMappingExposure: 1.5,
          }}
        >
          <Camera />
          <Light />
          <Suspense fallback={<div className="">Loading...</div>}>
            <Minecraft />
          </Suspense>
          <Environment files={"./recursos/hdr/decor_shop_1k.hdr"} />
          <OrbitControls target={[0, 7, 0]} />
        </Canvas>
      </div>
    </>
  );
};

export default SceneMinecraft;
