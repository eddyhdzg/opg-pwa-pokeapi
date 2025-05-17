const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');

const TOTAL_POKEMON = 151; // First generation Pokemon

async function generatePokemonPages() {
  try {
    // Read the template HTML file
    const templateHtml = fs.readFileSync(path.join(__dirname, '../build/index.html'), 'utf8');
    
    // Create pokemon directory if it doesn't exist
    const pokemonDir = path.join(__dirname, '../build/pokemon');
    if (!fs.existsSync(pokemonDir)) {
      fs.mkdirSync(pokemonDir, { recursive: true });
    }

    // Generate pages for each Pokemon
    for (let id = 1; id <= TOTAL_POKEMON; id++) {
      console.log(`Generating page for Pokemon #${id}...`);
      
      try {
        // Fetch Pokemon data from PokeAPI
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const pokemon = await response.json();
        
        // Replace placeholders in the template
        const html = templateHtml
          .replace('$OG_TITLE', `${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)} - Pokemon #${id}`)
          .replace('$OG_DESCRIPTION', `View details about ${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}, Pokemon #${id}`)
          .replace('$OG_IMAGE', pokemon.sprites.other['official-artwork'].front_default)
          .replace('$OG_URL', `https://your-domain.com/pokemon/${id}`);
        
        // Write the generated HTML to a file
        fs.writeFileSync(path.join(pokemonDir, `${id}.html`), html);
      } catch (error) {
        console.error(`Error generating page for Pokemon #${id}:`, error);
      }
    }
    
    console.log('Pokemon page generation complete!');
  } catch (error) {
    console.error('Error generating Pokemon pages:', error);
  }
}

// Execute the function
generatePokemonPages(); 