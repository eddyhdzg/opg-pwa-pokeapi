const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const path = require('path');
const fs = require('fs');

// Serve static files from the build directory
app.use(express.static(path.join(__dirname, 'build')));

// Handle Pokemon routes
app.get('/:id', function(request, response) {
  const pokemonId = request.params.id;
  const pokemonPagePath = path.join(__dirname, 'build', 'pokemon', `${pokemonId}.html`);
  
  // Check if pre-generated page exists
  if (fs.existsSync(pokemonPagePath)) {
    response.sendFile(pokemonPagePath);
  } else {
    // Fallback to dynamic generation if pre-generated page doesn't exist
    const filePath = path.resolve(__dirname, './build', 'index.html');
    response.sendFile(filePath);
  }
});

// Handle root route
app.get('/', function(request, response) {
  const filePath = path.resolve(__dirname, './build', 'index.html');
  response.sendFile(filePath);
});

// Handle all other routes
app.get('*', function(request, response) {
  response.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 
