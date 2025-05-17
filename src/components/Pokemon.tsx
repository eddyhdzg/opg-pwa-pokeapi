import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

interface Pokemon {
  name: string;
  id: number;
  sprites: {
    front_default: string;
  };
}

async function fetchPokemon(id: number): Promise<Pokemon> {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch Pokemon");
  }
  return response.json();
}

export function Pokemon() {
  const { id } = useParams();
  const navigate = useNavigate();
  const pokemonId = Number(id) || 1;

  const {
    data: pokemon,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["pokemon", pokemonId],
    queryFn: () => fetchPokemon(pokemonId),
  });

  const handlePrevious = () => {
    if (pokemonId > 1) {
      navigate(`/${pokemonId - 1}`);
    }
  };

  const handleNext = () => {
    navigate(`/${pokemonId + 1}`);
  };

  return (
    <div className="pokemon-container">
      <div className="pokemon-card">
        <div className="pokemon-image-container">
          {isLoading && (
            <div className="loading-placeholder">
              <div className="spinner" />
            </div>
          )}
          {pokemon && !isLoading && !error && (
            <img
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              className="pokemon-image"
            />
          )}
        </div>
        {error && <p>Error loading Pokemon</p>}
        <div className="pokemon-info">
          {isLoading ? (
            <>
              <div className="pokemon-number">#</div>
              <div className="text-placeholder">Loading...</div>
            </>
          ) : (
            pokemon &&
            !error && (
              <>
                <div className="pokemon-number">
                  #{pokemon.id.toString().padStart(3, "0")}
                </div>
                <h2>{pokemon.name}</h2>
              </>
            )
          )}
        </div>
      </div>
      <div className="controls">
        <button onClick={handlePrevious} disabled={pokemonId <= 1}>
          Previous
        </button>
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
}
