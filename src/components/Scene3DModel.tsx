import { Debug, Physics } from '@react-three/cannon'
import { Environment, OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import React from 'react'
import Base from './model/Base'
// import { CoffeCup } from './model/CoffeCup'
import { CoffeCups } from './model/CoffeCups'
import { Ball } from './model/Ball'
import * as THREE from 'three'

const Scene3DModel = () => {
  return (
    <div className='container'>
        <Canvas camera={{ position: [-10, 10, 20] }}
        gl={{ antialias: true, powerPreference: "high-performance", toneMapping: THREE.ACESFilmicToneMapping }}
        >
            <Physics
            broadphase='SAP'
            gravity={[0, -9.8, 0]}
            frictionGravity={[1, 1, 1]}
            defaultContactMaterial={{ restitution: 0.3 }}
            maxSubSteps={50}
            iterations={30}
            >
                {/* <Debug color={"red"}> */}
                    <CoffeCups />
                    <Base />
                    <Ball />
                {/* </Debug> */}
            </Physics>

            <OrbitControls />
            <Environment files={"./snowy_park_01_1k.hdr"}/>
        </Canvas>
    </div>
  )
}

export default Scene3DModel