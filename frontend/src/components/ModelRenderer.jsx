import { useState, useEffect } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { Box3, Vector3 } from "three";

import loadManager from "../utils/loadManager";
import { ModelEnum } from "../enum/ModelEnum";
import toast from "react-hot-toast";
// import process from "dotenv/config";

const ModelRenderer = (props) => {
  const { selectedPart, setSelectedPart } = props;
  const [scene, setScene] = useState(null);

  useEffect(() => {
    const url = import.meta.env.VITE_API_URL + "/api/models/" + props.typeModel;

    const loadGLTFModel = () => {
      const loader = new GLTFLoader(loadManager);

      loader.load(
        url,
        (gltf) => {
          const model = gltf.scene;
          const box = new Box3().setFromObject(model);
          const center = new Vector3();
          box.getCenter(center);

          model.position.sub(center);
          model.updateMatrixWorld(true);
          toast.success("Load model successfully");
          setScene(model);
        },
        undefined,
        (error) => {
          toast.error(error.message);
          console.error("Error loading model:", error);
        }
      );
    };

    const loadOBJModel = () => {
      const objLoader = new OBJLoader();
      const textureLoader = new THREE.TextureLoader();

      objLoader.load(url, (object) => {
        // Iterate through all the object materials and assign corresponding textures
        object.traverse((child) => {
          if (child.isMesh) {
            const texturePath =
              import.meta.env.VITE_API_URL + "/api/textures/" + child.name;

            if (texturePath) {
              const texture = textureLoader.load(
                texturePath,
                undefined,
                undefined,
                (error) => {
                  toast.error("Load texture fail");
                  console.error("Error loading texture:", error);
                }
              );
              child.material.map = texture; // Apply texture to the material
              child.material.needsUpdate = true; // Ensure the material updates
            }
          }
        });
        toast.success("Load model successfully");
        setScene(object);
      });
    };

    if (props.typeModel === ModelEnum.OBJ) {
      loadOBJModel();
    } else {
      loadGLTFModel();
    }

    return () => {
      setSelectedPart(null);
    };
  }, [props.typeModel, setSelectedPart]);

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
};

export default ModelRenderer;
