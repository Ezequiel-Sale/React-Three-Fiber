import {PerspectiveCamera} from '@react-three/drei'

const Camera = () => {
  return (
    <PerspectiveCamera makeDefault position={[-10, 20, 20]} fov={75}/>
  )
}

export default Camera