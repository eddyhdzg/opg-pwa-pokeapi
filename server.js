const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');

// Serve static files from the build directory
app.use(express.static(path.join(__dirname, 'build')));

// Handle Pokemon routes
app.get('/:id', async function(request, response) {
  const pokemonId = request.params.id;
  const pokemonPagePath = path.join(__dirname, 'build', 'pokemon', `${pokemonId}.html`);
  
  try {
    // Fetch Pokemon data for meta tags
    const pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
    if (!pokemonResponse.ok) {
      throw new Error('Failed to fetch Pokemon data');
    }
    const pokemon = await pokemonResponse.json();
    
    // Read the index.html template
    const indexPath = path.join(__dirname, 'build', 'index.html');
    let html = fs.readFileSync(indexPath, 'utf8');
    
    // Update meta tags
    const title = `#${pokemon.id.toString().padStart(3, '0')} ${pokemon.name}`;
    const description = `View details for ${pokemon.name}, Pokemon #${pokemon.id.toString().padStart(3, '0')}`;
    const imageUrl = pokemon.sprites.front_default;
    
    // Replace meta tags in the HTML
    html = html.replace(/<title>.*?<\/title>/, `<title>${title}</title>`);
    html = html.replace(/<meta name="description" content=".*?"/, `<meta name="description" content="${description}"`);
    html = html.replace(/<meta property="og:title" content=".*?"/, `<meta property="og:title" content="${title}"`);
    html = html.replace(/<meta property="og:description" content=".*?"/, `<meta property="og:description" content="${description}"`);
    html = html.replace(/<meta property="og:image" content=".*?"/, `<meta property="og:image" content="${imageUrl}"`);
    html = html.replace(/<meta property="twitter:title" content=".*?"/, `<meta property="twitter:title" content="${title}"`);
    html = html.replace(/<meta property="twitter:description" content=".*?"/, `<meta property="twitter:description" content="${description}"`);
    html = html.replace(/<meta property="twitter:image" content=".*?"/, `<meta property="twitter:image" content="${imageUrl}"`);
    
    // Update canonical URL
    const currentUrl = `https://pokemon-pwa.com/${pokemonId}`;
    html = html.replace(/<link rel="canonical" href=".*?"/, `<link rel="canonical" href="${currentUrl}"`);
    html = html.replace(/<meta property="og:url" content=".*?"/, `<meta property="og:url" content="${currentUrl}"`);
    html = html.replace(/<meta property="twitter:url" content=".*?"/, `<meta property="twitter:url" content="${currentUrl}"`);
    
    response.send(html);
  } catch (error) {
    console.error('Error generating Pokemon page:', error);
    // Fallback to index.html if there's an error
    response.sendFile(path.join(__dirname, 'build', 'index.html'));
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
