import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { Pokemon } from "./components/Pokemon";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white">
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
