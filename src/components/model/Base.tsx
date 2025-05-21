import React from "react";
import { Collaider } from "../Collaiders";

export default function Base({color}: { color: string }) {
  return (
    <>
      {/* Base */}
      <Collaider
        args={[80, 1, 80]}
        mass={1}
        type={"Static"}
        position={[0, -0.5, 0]}
        rotation={[0, 0, 0]}
        scale={[1, 1, 1]}>
        <mesh>
          <boxGeometry args={[80, 1, 80]} />
          <meshBasicMaterial color={color} />
        </mesh>
      </Collaider>
      {/* Pared frontal */}
      <Collaider
        args={[80, 5, 80]}
        mass={1}
        type={"Static"}
        position={[1, 40, 42.1]}
        rotation={[26.7, 0, 0]}
        scale={[1, 1, 1]}>
        <mesh>
          <boxGeometry args={[82, 5, 82]} />
          <meshBasicMaterial color={"#be513a"} />
        </mesh>
      </Collaider>
      {/* Pared trasera */}
      <Collaider
        args={[80, 5, 80]}
        mass={1}
        type={"Static"}
        position={[1, 40, -42.6]}
        rotation={[26.7, 0, 0]}
        scale={[1, 1, 1]}>
        <mesh>
          <boxGeometry args={[82, 5, 82]} />
          <meshBasicMaterial color={"#be513a"} />
        </mesh>
      </Collaider>
      {/* Pared lateral */}
      <Collaider
        args={[80, 5, 80]}
        mass={1}
        type={"Static"}
        position={[41.9, 40, 0]}
        rotation={[26.7, 0, 26.7]}
        scale={[1, 1, 1]}>
        <mesh>
          <boxGeometry args={[82, 5, 82]} />
          <meshBasicMaterial color={"#be513a"} />
        </mesh>
      </Collaider>
    </>
  );
}