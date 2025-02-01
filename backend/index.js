const express = require('express')
const path = require('path')
const cors = require('cors')

const app = express()
const PORT = 3000

// Middleware
app.use(cors()) // Enable CORS
app.use(express.json()) // Parse JSON

// Serve static files
app.use('/models', express.static(path.join(__dirname, 'models')))

app.get('/', (req, res) => {
    console.log("Got homepage")
    res.end("Hello")
})

// RESTful API to fetch model data
app.get('/api/models/:modelName', (req, res) => {
  const modelName = req.params.modelName
  const modelPath = path.join(__dirname, 'models', modelName)

  // Check if file exists
  if (path.extname(modelName) !== '.gltf' && path.extname(modelName) !== '.glb' && path.extname(modelName) !== '.obj') {
    return res.status(400).send('Invalid file type')
  }

  res.sendFile(modelPath, (err) => {
    if (err) {
      res.status(404).send('Model not found')
    }
  })
})

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})