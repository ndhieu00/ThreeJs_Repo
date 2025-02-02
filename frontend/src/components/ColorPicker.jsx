import { HexColorPicker } from "react-colorful";

const ColorPicker = (props) => {
  const handleColorChange = (newColor) => {
    if (props.selectedPart) {
      props.selectedPart.material.color.set(newColor);
    }
  };
  
  return (
    <div className="color-picker-container">
      <HexColorPicker onChange={handleColorChange} />
    </div>
  );
};

export default ColorPicker;
