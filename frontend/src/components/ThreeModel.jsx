import { Suspense, useState } from "react";
import { Canvas } from "react-three-fiber";
import { ContactShadows, Environment, OrbitControls } from "@react-three/drei";
import ModelRenderer from "./ModelRenderer";
import ColorPicker from "./ColorPicker";

const ThreeModel = (props) => {
  const [selectedPart, setSelectedPart] = useState(null);

  return (
    <>
      <Canvas
        pixelratio={[1, 1.5]}
        camera={{ position: [0, 0, 2.75], fov: 50 }}
      >
        <ambientLight intensity={0.8} />
        <spotLight
          intensity={0.3}
          angle={0.1}
          penumbra={1}
          position={[5, 25, 20]}
        />
        <Suspense fallback={null}>
          <ModelRenderer
            typeModel={props.typeModel}
            selectedPart={selectedPart}
            setSelectedPart={setSelectedPart}
          />
          <Environment files="royal_esplanade_1k.hdr" />
          <ContactShadows
            rotation-x={Math.PI / 2}
            position={[0, -0.6, 0]}
            opacity={0.7}
            blur={2}
            far={1}
          />
        </Suspense>
        <OrbitControls />
      </Canvas>
      {selectedPart && (
        <ColorPicker
          selectedPart={selectedPart}
        />
      )}
    </>
  );
};

export default ThreeModel;
