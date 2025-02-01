import { Suspense, useState, useEffect, useRef } from 'react'
import { Canvas } from 'react-three-fiber'
import { HexColorPicker } from 'react-colorful'
import {
  ContactShadows,
  Environment,
  useGLTF,
  OrbitControls,
} from '@react-three/drei'
import './App.css'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Box3, Vector3 } from 'three'

function ModelLoader(props) {
  const { selectedPart, handlePointerDown, handlePointerMissed } = props

  // State to hold the loaded model scene
  const [scene, setScene] = useState(null)

  // Reference to the loader

  useEffect(() => {
    const loader = new GLTFLoader()
    loader.load(
      'shoe.gltf', // path to your model file
      // 'mary_jane_heels/scene.gltf', // path to your model file
      (gltf) => {
        // setScene(gltf.scene) // Store the loaded scene in state
        const model = gltf.scene
        const box = new Box3().setFromObject(model) // Compute bounding box
        const center = new Vector3()
        box.getCenter(center) // Get center of the bounding box

        model.position.sub(center) // Shift the object to center
        model.updateMatrixWorld(true) // Update world matrix to reflect changes
        setScene(model) // Store the loaded scene in state

        // // Update OrbitControls target
        // const box2 = new Box3().setFromObject(model)
        // const center2 = new Vector3()
        // box2.getCenter(center2)

        // props.controlRef.current.update()
        // props.controlRef.current.target.set(center2.x, center2.y, center2.z)
      },
      undefined, // Optional: you can handle progress here
      (error) => {
        console.error('Error loading model:', error)
      }
    )
  }, []) // Runs once when the component mounts

  const outlineMaterial = new THREE.MeshBasicMaterial({
    color: 0xffffff, // Bright yellow
    side: THREE.BackSide, // Renders behind the mesh
    transparent: true, // Enable transparency
    opacity: 0.2,
    wireframe: true, // Show only the edges (as a "border")
    wireframeLinewidth: 2,
  })

  if (!scene) return <></>

  return (
    <group
      onPointerDown={handlePointerDown}
      onPointerMissed={handlePointerMissed}
    >
      <primitive object={scene} />
      {selectedPart && (
        <mesh
          geometry={selectedPart.geometry}
          material={outlineMaterial}
          position={selectedPart.position}
          rotation={selectedPart.rotation}
          scale={selectedPart.scale.clone().multiplyScalar(1.01)} // Slightly larger for the outline
        />
      )}
    </group>
  )
}

function App() {
  const [selectedPart, setSelectedPart] = useState(null)
  const [color, setColor] = useState('#ff0000')
  const controlRef = useRef(null)

  const handlePointerDown = (event) => {
    event.stopPropagation()
    setSelectedPart(event.object)
  }

  const handlePointerMissed = () => {
    setSelectedPart(null)
  }

  const handleColorChange = (newColor) => {
    setColor(newColor)
    if (selectedPart) {
      selectedPart.material.color.set(newColor)
    }
  }

  return (
    <>
      <Canvas
        pixelratio={[1, 1.5]}
        camera={{ position: [0, 0, 2.75], fov: 50 }}
      >
        <ambientLight intensity={0.3} />
        <spotLight
          intensity={0.3}
          angle={0.1}
          penumbra={1}
          position={[5, 25, 20]}
        />
        <Suspense fallback={null}>
          <ModelLoader
            selectedPart={selectedPart}
            handlePointerDown={handlePointerDown}
            handlePointerMissed={handlePointerMissed}
            // controlRef={controlRef}
          />
          <Environment files='royal_esplanade_1k.hdr' />
          <ContactShadows
            rotation-x={Math.PI / 2}
            position={[0, -0.8, 0]}
            opacity={0.25}
            width={10}
            height={10}
            blur={2}
            far={1}
          />
        </Suspense>
        <OrbitControls
        // ref={controlRef}
        />
      </Canvas>
      {selectedPart && (
        <div className='color-picker-container'>
          <HexColorPicker color={color} onChange={handleColorChange} />
        </div>
      )}
    </>
  )
}

export default App
