import React from 'react'
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Camera from "./Camera";
import { Suspense } from "react";
import Light from "./Light";
import { Environment } from "@react-three/drei";
import { Minecraft } from "./Minecraft";
import * as THREE from "three";

const SceneMinecraft = () => {
  return (
    <>
     <div className="Container" style={{ height: "100vh", width: "100vw", backgroundColor: "black" }}>
        <Canvas
          gl={{
            antialias: true,
            toneMapping: THREE.ReinhardToneMapping,
            toneMappingExposure: 1.5,
          }}
          shadows="true"
          shadowMap
        >
          <Camera />
         <Light />
          <Suspense fallback={null}>
            <Minecraft />
            <Environment
              files={"./recursos/hdr/decor_shop_1k.hdr"}
              background={false}
            />
          </Suspense>
          <OrbitControls />
        </Canvas>
      </div>
    </>
  )
}

export default SceneMinecraft