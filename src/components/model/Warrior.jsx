import React, { useEffect, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { BasicCharacterController } from "../utils/CharacterControlers";

export function Warrior() {
  const { scene } = useThree();
  const controllerRef = useRef(null);
  const [model, setModel] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const charController = new BasicCharacterController({ scene });
    controllerRef.current = charController;

    const interval = setInterval(() => {
      if (charController._target && isMounted) {
        setModel(charController._target);
        clearInterval(interval);
      }
    }, 100);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [scene]);

  useFrame((_, delta) => {
    controllerRef.current?.Update(delta);
  });

  return (
    <group>
      {model && (
        <primitive
          object={model}
          scale={0.046}
          position={[0, 0, 0]}
          rotation={[0, 0, 0]}
          castShadow
        />
      )}
    </group>
  );
}