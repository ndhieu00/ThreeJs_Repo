import { useState } from "react";
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
      <TypeModelManager
        typeModel={typeModel}
        handleChangeTypeModel={handleChangeTypeModel}
      />
      <ThreeModel typeModel={typeModel}/>
    </div>
  );
}

export default App;
