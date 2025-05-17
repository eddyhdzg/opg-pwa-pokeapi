const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const path = require('path');
const fs = require('fs');

// Handle Pokemon routes first
app.get('/:id', async function(request, response) {
  console.log(`Pokemon #${request.params.id} page visited!`);
  const filePath = path.resolve(__dirname, './build', 'index.html');

  try {
    console.log('Fetching Pokemon data...');
    // Fetch Pokemon data
    const pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${request.params.id}`);
    const pokemon = await pokemonResponse.json();
    console.log('Pokemon data received:', pokemon.name);

    // Read the index.html file
    fs.readFile(filePath, 'utf8', function (err, data) {
      if (err) {
        console.error('Error reading file:', err);
        return console.log(err);
      }
      console.log('File read successfully');

      const title = `#${pokemon.id.toString().padStart(3, '0')} ${pokemon.name}`;
      const description = `View details for ${pokemon.name}, Pokemon #${pokemon.id.toString().padStart(3, '0')}`;
      const image = pokemon.sprites.front_default;
      const url = `${request.protocol}://${request.get('host')}${request.originalUrl}`;

      console.log('Replacing meta tags with:', { title, description, image, url });

      // Replace the special strings with server generated strings
      data = data.replace(/\$OG_TITLE/g, title);
      data = data.replace(/\$OG_DESCRIPTION/g, description);
      data = data.replace(/\$OG_IMAGE/g, image);
      data = data.replace(/\$OG_URL/g, url);

      console.log('Sending response...');
      response.send(data);
    });
  } catch (error) {
    console.error('Error:', error);
    response.sendFile(filePath);
  }
});

// Handle root route
app.get('/', function(request, response) {
  console.log('Home page visited!');
  const filePath = path.resolve(__dirname, './build', 'index.html');

  fs.readFile(filePath, 'utf8', function (err, data) {
    if (err) {
      console.error('Error reading file:', err);
      return console.log(err);
    }
    console.log('File read successfully');

    data = data.replace(/\$OG_TITLE/g, 'Pokemon PWA');
    data = data.replace(/\$OG_DESCRIPTION/g, 'A Progressive Web App for Pokemon enthusiasts');
    data = data.replace(/\$OG_IMAGE/g, 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png');
    data = data.replace(/\$OG_URL/g, `${request.protocol}://${request.get('host')}`);

    console.log('Sending response...');
    response.send(data);
  });
});

// Serve static files from the React app
app.use(express.static(path.resolve(__dirname, './build')));

// Handle all other routes
app.get('*', function(request, response) {
  console.log('Catch-all route hit:', request.path);
  const filePath = path.resolve(__dirname, './build', 'index.html');
  response.sendFile(filePath);
});

app.listen(port, () => console.log(`Listening on port ${port}`)); 
