import { useState } from "react";
import { Toaster } from "react-hot-toast";
import "./App.css";

import ThreeModel from "./components/ThreeModel.jsx";
import TypeModelManager from "./components/TypeModelManager.jsx";

import { ModelEnum } from "./enum/ModelEnum.js";

function App() {
  const [typeModel, setTypeModel] = useState(ModelEnum.GLTF);

  const handleChangeTypeModel = (type) => {
    setTypeModel(type);
  };

  return (
    <div className="app-container">
      <Toaster position="top-right" reverseOrder={false} />
      <TypeModelManager
        typeModel={typeModel}
        handleChangeTypeModel={handleChangeTypeModel}
      />
      <ThreeModel typeModel={typeModel} />
    </div>
  );
}

export default App;
