import { Collaider } from "../Collaiders";

export default function Base() {
  return (
    <Collaider
      args={[120, 1, 120]}
      mass={1}
      type={"Static"}
      position={[0, -0.5, 0]}
      rotation={[0, 0, 0]}
      scale={[0, 0, 0]}>
      <mesh>
        <boxGeometry args={[120, 1, 120]} />
        <meshBasicMaterial />
      </mesh>
    </Collaider>
  );
}
