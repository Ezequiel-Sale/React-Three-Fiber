import { Debug, Physics } from '@react-three/cannon'
import { Environment, OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import React, { Suspense } from 'react'
import Base from './model/Base'
// import { CoffeCup } from './model/CoffeCup'
import { CoffeCups } from './model/CoffeCups'
import { Ball } from './model/Ball'
import * as THREE from 'three'
const Scene3DModel = () => {
  return (
    <div className='container'>
        <Canvas camera={{ position: [-20, 10, 25] }}
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
                <Suspense fallback={<div>Loading...</div>}>
                    <CoffeCups />
                    <Base color='#000000'/>
                    <Ball />
                </Suspense>
                {/* </Debug> */}
            </Physics>

            <OrbitControls />
            <Environment files={"./snowy_park_01_1k.hdr"}/>
        </Canvas>
    </div>
  )
}

export default Scene3DModel