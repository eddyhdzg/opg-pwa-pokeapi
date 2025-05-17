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
      <div className="App">
        <header className="App-header">
          <h1>Pokemon Viewer</h1>
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
