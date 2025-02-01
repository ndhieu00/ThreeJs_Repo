
import { useState, useEffect } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Box3, Vector3 } from "three";

const ModelRenderer = (props) => {
  const { selectedPart, handlePointerDown, handlePointerMissed } = props;
  const [scene, setScene] = useState(null);

  useEffect(() => {
    const loader = new GLTFLoader();
    loader.load(
      "shoe/scene.gltf",
      (gltf) => {
        const model = gltf.scene;
        const box = new Box3().setFromObject(model);
        const center = new Vector3();
        box.getCenter(center);

        model.position.sub(center);
        model.updateMatrixWorld(true);
        setScene(model);
      },
      undefined,
      (error) => {
        console.error("Error loading model:", error);
      }
    );
  }, []);

  const outlineMaterial = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    side: THREE.BackSide,
    transparent: true,
    opacity: 0.2,
    wireframe: true,
    wireframeLinewidth: 2,
  });

  if (!scene) return <></>;

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
          scale={selectedPart.scale.clone().multiplyScalar(1.01)}
        />
      )}
    </group>
  );
}

export default ModelRenderer