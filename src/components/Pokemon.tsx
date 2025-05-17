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
    <div className="flex flex-col items-center gap-4 p-8">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-lg">
        <div className="w-[200px] h-[200px] flex items-center justify-center relative mx-auto">
          {isLoading && (
            <div className="w-full h-full flex items-center justify-center rounded-2xl">
              <div className="w-12 h-12 border-4 border-blue-400/20 border-t-blue-400 rounded-full animate-spin" />
            </div>
          )}
          {pokemon && !isLoading && !error && (
            <img
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              className="w-full h-full object-contain block"
            />
          )}
        </div>
        {error && <p className="text-red-500">Error loading Pokemon</p>}
        <div className="flex flex-col items-center gap-1 my-2 min-h-[3.5em]">
          {isLoading ? (
            <>
              <div className="text-base text-blue-400/80 h-[1.2em] leading-[1.2em] min-w-[2em] text-center">
                #
              </div>
              <div className="h-[1.5em] leading-[1.5em] text-blue-400/70 text-2xl min-w-[6em] text-center">
                Loading...
              </div>
            </>
          ) : (
            pokemon &&
            !error && (
              <>
                <div className="text-base text-blue-400/80 h-[1.2em] leading-[1.2em] min-w-[2em] text-center">
                  #{pokemon.id.toString().padStart(3, "0")}
                </div>
                <h2 className="m-0 text-2xl h-[1.5em] leading-[1.5em] capitalize min-w-[6em] text-center">
                  {pokemon.name}
                </h2>
              </>
            )
          )}
        </div>
      </div>
      <div className="flex gap-4 mt-4">
        <button
          onClick={handlePrevious}
          disabled={pokemonId <= 1}
          className="px-4 py-2 text-base bg-blue-400 border-none rounded-lg text-gray-900 cursor-pointer transition-colors hover:bg-blue-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          className="px-4 py-2 text-base bg-blue-400 border-none rounded-lg text-gray-900 cursor-pointer transition-colors hover:bg-blue-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
}
