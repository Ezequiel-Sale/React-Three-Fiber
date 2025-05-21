import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import React, { useLayoutEffect } from "react";
import { useSphereCollaider } from "../Collaiders";

type GLTFResult = GLTF & {
  nodes: {
    Sphere: THREE.Mesh;
  };
  materials: {
    Atlas_Material: THREE.MeshStandardMaterial;
  };
};

export function Ball(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("/Ball.glb") as unknown as GLTFResult;
  const { sphereCollaiderRef, sphereCollaiderAPI } = useSphereCollaider({
    type: "Dynamic",
    mass: 50,
    args: [1],
    position: [-5.646, 1, 0],
    rotation: [0, 0, 0],
    scale: [0, 0, 0],
  });

  useLayoutEffect(() => {
    setTimeout(() => {
      sphereCollaiderAPI.applyForce([150000, 10000, 0], [0, 0, 0]);
    }, 5000);
  }, []);

  return (
    <group {...props} dispose={null}>
      <mesh
        ref={sphereCollaiderRef}
        name='Sphere'
        castShadow
        receiveShadow
        geometry={nodes.Sphere.geometry}
        material={materials.Atlas_Material}
      />
    </group>
  );
}

useGLTF.preload("/Ball.glb");
