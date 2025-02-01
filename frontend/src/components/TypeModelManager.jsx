import { ModelEnum } from "../enum/ModelEnum";

const TypeModelManager = (props) => {
  return (
    <div className="type-model-manager-container">
      <button
        onClick={() => props.handleChangeTypeModel(ModelEnum.GTLF)}
        className={`type-model-container ${
          props.typeModel === ModelEnum.GTL ? "active" : ""
        }`}
      >
        <text>GTLF File</text>
      </button>
      <button
        onClick={() => props.handleChangeTypeModel(ModelEnum.GLB)}
        className={`type-model-container ${
          props.typeModel === ModelEnum.GLB ? "active" : ""
        }`}
      >
        <text>GLB File</text>
      </button>
      <button
        onClick={() => props.handleChangeTypeModel(ModelEnum.OBJ)}
        className={`type-model-container ${
          props.typeModel === ModelEnum.OBJ ? "active" : ""
        }`}
      >
        <text>OBJ File</text>
      </button>
    </div>
  );
};

export default TypeModelManager;
