
import { useState, useEffect } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Box3, Vector3 } from "three";
import { ModelEnum } from "../enum/ModelEnum";

const ModelRenderer = (props) => {
  const { selectedPart, setSelectedPart } = props;
  const [scene, setScene] = useState(null);

  useEffect(() => {
    const loader = new GLTFLoader();
    let pathModel
    if (props.typeModel === ModelEnum.GLTF) {
      pathModel = "shoe/scene.gltf"
    } else if (props.typeModel === ModelEnum.GLB) {
      pathModel = "ankle_strap_sandal_high_heels.glb"
    }

    if (!pathModel) return

    loader.load(
      pathModel,
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
  }, [props.typeModel]);


  const handlePointerDown = (event) => {
    event.stopPropagation();
    setSelectedPart(event.object);
  };

  const handlePointerMissed = () => {
    setSelectedPart(null);
  };

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