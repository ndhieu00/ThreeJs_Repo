const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 3000;

const ModelEnum = {
  GLTF: "gltf",
  GLB: "glb",
  OBJ: "obj",
};

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON

// Serve static files
app.use("/models", express.static(path.join(__dirname, "models")));
app.use("/textures", express.static(path.join(__dirname, "models/textures")));

app.get("/api/textures/:textureName", (req, res) => {
  const textureName = req.params.textureName + ".png";
  const texturePath = path.join(__dirname, "models/textures", textureName);
  console.log("texturePath:", texturePath);

  res.sendFile(texturePath, (err) => {
    if (err) {
      res.status(404).send("Model not found");
    }
  });
});

app.get("/api/sub-models/:modelName", (req, res) => {
  const modelName = req.params.modelName;
  const modelPath = path.join(__dirname, "models", modelName);
  res.sendFile(modelPath, (err) => {
    if (err) {
      res.status(404).send("Model not found");
    }
  });
});

// RESTful API to fetch model data
app.get("/api/models/:typeModel", (req, res) => {
  const typeModel = req.params.typeModel;
  // Check if file exists
  if (![ModelEnum.GLTF, ModelEnum.GLB, ModelEnum.OBJ].includes(typeModel)) {
    return res.status(400).send("Invalid file type");
  }

  const modelPath = path.join(
    __dirname,
    "models",
    `${typeModel}_file.${typeModel}`
  );

  res.sendFile(modelPath, (err) => {
    if (err) {
      res.status(404).send("Model not found");
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
