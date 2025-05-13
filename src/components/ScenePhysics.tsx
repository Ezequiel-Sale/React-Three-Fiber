import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Physics, Debug } from "@react-three/cannon";
import "../App.css";
import {
  Collaider,
  CylinderCollaider,
  IcosahedronCollaider,
  SphereCollaider,
} from "./Collaiders";

const ScenePhysics = () => {
  return (
    <div className="container">
      <Canvas camera={{ position: [5, 10, 20] }}>
        <Physics
          broadphase="SAP"
          gravity={[0, -9.8, 0]}
          frictionGravity={[0, 1, 0]}
          defaultContactMaterial={{ restitution: 0.3 }}
        >
          <Debug color={"red"}>
            <Collaider
              args={[1, 1, 1]}
              mass={1}
              type={"Dynamic"}
              position={[0, 10, 0]}
              rotation={[0, 0, 0]}
              scale={[0, 0, 0]}
            >
              <mesh>
                <boxGeometry args={[1, 1, 1]} />
                <meshNormalMaterial />
              </mesh>
            </Collaider>

            <Collaider
              args={[120, 1, 120]}
              mass={1}
              type={"Static"}
              position={[0, 0, 0]}
              rotation={[0, 0, 0]}
              scale={[0, 0, 0]}
            >
              <mesh>
                <boxGeometry args={[120, 1, 120]} />
                <meshBasicMaterial />
              </mesh>
            </Collaider>

            <SphereCollaider
              args={[2]}
              mass={1}
              type={"Dynamic"}
              position={[10, 2, 0]}
              rotation={[0, 0, 0]}
              scale={[0, 0, 0]}
            >
              <mesh>
                <sphereGeometry args={[2, 16, 15]} />
                <meshNormalMaterial />
              </mesh>
            </SphereCollaider>

            <CylinderCollaider
              args={[1, 2, 10]}
              mass={1}
              type={"Dynamic"}
              position={[-20, 2, 0]}
              rotation={[0, 0, 0]}
              scale={[0, 0, 0]}
            >
              <mesh>
                <cylinderGeometry args={[1, 2, 10]} />
                <meshNormalMaterial />
              </mesh>
            </CylinderCollaider>

            <IcosahedronCollaider
              args={1}
              detail={2}
              mass={1}
              type={"Dynamic"}
              position={[10, 5, -10]}
              rotation={[0, 0, 0]}
              scale={[1, 1, 1]}
            >
              <mesh>
                <icosahedronGeometry args={[1, 2]} />
                <meshNormalMaterial />
              </mesh>
            </IcosahedronCollaider>
          </Debug>
        </Physics>

        <OrbitControls target={[0, 0, 0]} />
      </Canvas>
    </div>
  );
};

export default ScenePhysics;
