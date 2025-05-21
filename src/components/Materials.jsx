import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Camera from "./Camera.jsx";
import Bricks from "./Bricks.jsx";
import Light from "./Light";
import { Environment } from "@react-three/drei";
import * as THREE from "three";
import Matcap from "./Matcap.jsx";

const Materials = () => {
  return (
    <>
      <div
        className="Container"
        style={{ height: "100vh", width: "100vw", backgroundColor: "black" }}
      >
        <Canvas
          frameloop="demand"
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
            <torusKnotGeometry args={[1, 0.3, 32, 16]} />
            <meshNormalMaterial color={"red"} flatShading={true} />
          </mesh>
          <Matcap />
          <Bricks />
          <Environment
            files={"./recursos/hdr/decor_shop_1k.hdr"}
            background={false}
          />

          <OrbitControls makeDefault enableDamping dampingFactor={0.1} />
        </Canvas>
      </div>
    </>
  );
};

export default Materials;
