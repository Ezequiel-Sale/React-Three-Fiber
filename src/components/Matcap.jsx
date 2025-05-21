import { useLoader } from '@react-three/fiber'
import {TextureLoader} from 'three/src/loaders/TextureLoader.js'

const Matcap = () => {
      const matcap = useLoader(TextureLoader, './recursos/matcaps/matcap1.png')
    
  return (
    <mesh position={[0, 0, 0]}>
      <torusKnotGeometry args={[1, 0.3, 32, 16]} />
    <meshMatcapMaterial matcap={matcap}/>
  </mesh>
  )
}

export default Matcap