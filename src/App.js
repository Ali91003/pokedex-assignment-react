import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Pokedex from './components/Pokedex';
import About from './components/About';
import PokemonDetails from './components/PokemonDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Pokedex />} />
        <Route path="/about" element={<About />} />
        <Route path="/:pokemonName" element={<PokemonDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
