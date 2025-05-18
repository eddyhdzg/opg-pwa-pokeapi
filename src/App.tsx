import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { Pokemon } from "./components/Pokemon";
import SEO from "./components/SEO";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white">
        <SEO
          titleTemplate="%s | Pokemon Viewer"
          defaultTitle="Pokemon Viewer"
          description="Explore the world of Pokemon with our interactive Pokedex"
          keywords={[
            "pokemon",
            "pokedex",
            "pokemon database",
            "pokemon viewer",
          ]}
          url={window.location.href}
          type="website"
        />
        <header className="min-h-screen flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold mb-8">Pokemon Viewer</h1>
          <Routes>
            <Route path="/" element={<Navigate to="/1" replace />} />
            <Route path="/:id" element={<Pokemon />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
