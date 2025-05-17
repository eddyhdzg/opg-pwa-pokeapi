const express = require("express");
const path = require("path");
const fs = require("fs");

const PORT = process.env.PORT || 5000;
const app = express();

// Serve static files from the React app
app.use(express.static(path.resolve(__dirname, "./build")));

// Handle Pokemon routes
app.get("/:id", async (req, res) => {
  const pokemonId = req.params.id;
  const filePath = path.resolve(__dirname, "./build", "index.html");

  try {
    // Fetch Pokemon data
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
    const pokemon = await response.json();

    // Read the index.html file
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        return console.log(err);
      }

      const title = `#${pokemon.id.toString().padStart(3, '0')} ${pokemon.name}`;
      const description = `View details for ${pokemon.name}, Pokemon #${pokemon.id.toString().padStart(3, '0')}`;
      const image = pokemon.sprites.front_default;
      const url = `${req.protocol}://${req.get('host')}${req.originalUrl}`;

      // Replace placeholders with actual values
      data = data
        .replace(/__TITLE__/g, title)
        .replace(/__DESCRIPTION__/g, description)
        .replace(/__IMAGE__/g, image)
        .replace(/__URL__/g, url);

      res.send(data);
    });
  } catch (error) {
    console.error('Error:', error);
    // If there's an error, serve the default index.html
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        return console.log(err);
      }
      res.send(data);
    });
  }
});

// Handle root route
app.get("/", (req, res) => {
  const filePath = path.resolve(__dirname, "./build", "index.html");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return console.log(err);
    }

    data = data
      .replace(/__TITLE__/g, "Pokemon PWA")
      .replace(/__DESCRIPTION__/g, "A Progressive Web App for Pokemon enthusiasts")
      .replace(/__IMAGE__/g, "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png")
      .replace(/__URL__/g, `${req.protocol}://${req.get('host')}`);

    res.send(data);
  });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
}); 