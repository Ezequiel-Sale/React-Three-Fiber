import React from 'react'
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Camera from "./Camera";
import { Suspense } from "react";
import Matcap from "./matcap";
import Bricks from "./Bricks";
import Light from "./Light";
import { Environment } from "@react-three/drei";
import * as THREE from "three";

const Materials = () => {
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
         <mesh position={[4, 0, 0]}>
            <torusKnotGeometry args={[1, 0.3, 100, 100]} />
            <meshNormalMaterial color={"red"} flatShading={true} />
          </mesh>
          <Suspense fallback={null}>
            <Matcap />
            <Bricks /> 
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

export default Materials