import React from "react";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader.js";
import * as THREE from "three";

const Bricks = () => {
  const baseColor = useLoader(TextureLoader, "./recursos/bricks/basecolor.jpg");
  const normalMap = useLoader(TextureLoader, "./recursos/bricks/normal.jpg");
  const aoMap = useLoader(TextureLoader, "./recursos/bricks/ao.jpg");
  const roughnessMap = useLoader(
    TextureLoader,
    "./recursos/bricks/roughness.jpg"
  );
  const displacementMap = useLoader(
    TextureLoader,
    "./recursos/bricks/displacement.png"
  );

  // baseColor.minFilter = THREE.NearestFilter
  // baseColor.magFilter = THREE.NearestFilter
  return (
    <mesh position={[-4, 0, 0]} scale={2.5}>
      <boxGeometry args={[1, 1, 1, 10, 10, 10]} />
      <meshStandardMaterial
        map={baseColor}
        normalMap={normalMap}
        aoMap={aoMap}
        roughnessMap={roughnessMap}
        displacementMap={displacementMap}
        displacementScale={0.001}
      />
    </mesh>
  );
};

export default Bricks;
