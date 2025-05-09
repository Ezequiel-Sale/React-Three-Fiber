import React, { useEffect, useRef } from 'react'
import * as dat from "dat.gui";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

const DebbuginTool = () => {
    const mesh = useRef(null);
  const light = useRef(null);
  const material = useRef(null);
  useEffect(() => {
    const gui = new dat.GUI({
      width: 400,
    });
    const debugObject = {
      position: {
        x: 0,
        y: 0,
        z: 0,
      },
      ligthIntensity: 5,
      colorMaterial: "#ff0000",
      scale: 1,
      castShadow: true,
    };
    gui
      .add(debugObject, "castShadow")
      .onChange(() => {
      light.current.castShadow = debugObject.castShadow;
      })
      .name("Cast Shadow");

    gui
      .add(debugObject, "scale", {
        "small": 1,
        "medium": 2,
        "big": 3,
      })
      .onChange(() => {
        mesh.current.scale.set(debugObject.scale, debugObject.scale, debugObject.scale);
      })
      .name("Scale");

    gui
      .addColor(debugObject, "colorMaterial")
      .onChange(() => {
        mesh.current.material.color = new THREE.Color(debugObject.colorMaterial);
      })
      .name("Color Material");

    gui
      .add(debugObject, "ligthIntensity")
      .min(0)
      .max(10)
      .step(0.0005)
      .onChange(() => {
        light.current.intensity = debugObject.ligthIntensity;
      })
      .name("Light Intensity");

    gui
      .add(debugObject.position, "x")
      .min(-4)
      .max(4)
      .step(0.01)
      .onChange(() => {
        mesh.current.position.x = debugObject.position.x;
      })
      .name("X Position");

    gui
      .add(debugObject.position, "y")
      .min(-4)
      .max(4)
      .step(0.01)
      .onChange(() => {
        mesh.current.position.y = debugObject.position.y;
      })
      .name("y Position");

    gui
      .add(debugObject.position, "z")
      .min(-4)
      .max(4)
      .step(0.01)
      .onChange(() => {
        mesh.current.position.z = debugObject.position.z;
      })
      .name("z Position");

    return () => {
      gui.destroy();
    };
  }, []);
  return (
    <>
    <div className="Container" style={{ height: "100vh", width: "100vw" }}>
            <Canvas
              gl={{
                antialias: true,
                toneMapping: THREE.ReinhardToneMapping,
                toneMappingExposure: 1.5,
              }}
              shadows="true"
              shadowMap
              camera={{
                position: [3, 3, -3],
              }}
            >
              <mesh ref={mesh} castShadow={true}  >
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color={"red"} ref={material}/>
              </mesh>
              <mesh rotation-x={Math.PI * -0.5} position={[0, -0.5, 0]} receiveShadow={true}>
                <planeGeometry args={[5, 5, 5, 100, 100]} />
                <meshStandardMaterial color={"green"}/>
              </mesh>
              <directionalLight position={[10, 10, 10]} ref={light} castShadow={true} color={"white"}/>
              <OrbitControls />
            </Canvas>
          </div>
    </>
  )
}

export default DebbuginTool