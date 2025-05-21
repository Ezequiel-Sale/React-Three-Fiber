import React, { useEffect, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { BasicCharacterController } from "../utils/CharacterControlers";

export function Warrior() {
  const { scene } = useThree();
  const [controller, setController] = useState(null);
  const [model, setModel] = useState(null);
  const ref = useRef(null);

  useEffect(() => {
    // Instanciar el controlador y guardar la referencia
    const charController = new BasicCharacterController({ scene });
    setController(charController);

    // Esperar a que el modelo se cargue y actualizar el estado
    const interval = setInterval(() => {
      if (charController._target) {
        setModel(charController._target);
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [scene, setController, setModel]);

  // Actualizar animaciones y lógica cada frame
  useFrame((_, delta) => {
    if (controller) {
      controller.Update(delta);
    }
  });

  return (
    <group ref={ref}>
      {model && (
        <primitive
          object={model}
          scale={0.046}
          position={[0, 0, 0]}
          rotation={[0, 0, 0]}
          castShadow={true}
        />
      )}
    </group>
  );
}

