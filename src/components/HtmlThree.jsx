import React, { Suspense } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Laptop } from "./Laptop";
import "../styles/laptop.css";

const HtmlThree = () => {
  return (
    <>
      <div className="container">
        <Canvas
          camera={{ position: [0, 6, 25], fov: 75 }}
          gl={{
            outputEncoding: THREE.sRGBEncoding,
            antialias: true,
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 3.4,
          }}
        >
          <Suspense fallback={null}>
            <Laptop />
          </Suspense>

          <directionalLight
            position={[10, 10, 10]}
            intensity={1.3}
            color={"#ffffff"}
          />
          <ambientLight intensity={0.5} color={"#ffffff"} />
          <OrbitControls target={[0, 5, 1]} />
        </Canvas>
      </div>
    </>
  );
};

export default HtmlThree;
