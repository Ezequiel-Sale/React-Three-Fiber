import { Canvas } from "@react-three/fiber";
import { HeadPhone } from "./HeadPhoneModel";
import { Environment, ScrollControls } from "@react-three/drei";
import * as THREE from "three";

const SceneHeadPhones = () => {
  return (
    <Canvas
      camera={{ fov: 65, position: [0, 0, 8.3] }}
      gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
    >
      <ScrollControls pages={6} damping={0.25}>
        <HeadPhone />
      </ScrollControls>
      
      <ambientLight intensity={1.6} />
      <Environment files={"./models/abandoned_tiled_room_1k.hdr"} />
    </Canvas>
  );
};

export default SceneHeadPhones;
