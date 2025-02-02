import { ModelEnum } from "../enum/ModelEnum";

const TypeModelManager = (props) => {
  return (
    <div className="type-model-manager-container">
      <button
        onClick={() => props.handleChangeTypeModel(ModelEnum.GLTF)}
        className={`type-model-container ${
          props.typeModel === ModelEnum.GLTF ? "active" : ""
        }`}
      >
        <span>GLTF File</span>
      </button>
      <button
        onClick={() => props.handleChangeTypeModel(ModelEnum.GLB)}
        className={`type-model-container ${
          props.typeModel === ModelEnum.GLB ? "active" : ""
        }`}
      >
        <span>GLB File</span>
      </button>
      <button
        onClick={() => props.handleChangeTypeModel(ModelEnum.OBJ)}
        className={`type-model-container ${
          props.typeModel === ModelEnum.OBJ ? "active" : ""
        }`}
      >
        <span>OBJ File</span>
      </button>
    </div>
  );
};

export default TypeModelManager;
