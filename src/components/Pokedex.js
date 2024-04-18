import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Pokedex.css'; 
import PokeLogo from '../logo/PokeLogo.png';

const Pokedex = () => {
  const [pokemons, setPokemons] = useState([]);
  const [offset, setOffset] = useState(0);
  const limit = 20;
  const currentPageUrl = `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`;

  useEffect(() => {
    axios.get(currentPageUrl).then(res => {
      const fetchedPokemons = res.data.results;
      const pokemonsWithImages = fetchedPokemons.map(pokemon => {
        return { ...pokemon, imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/')[6]}.png` };
      });
      setPokemons(pokemonsWithImages);
    });
  }, [currentPageUrl]);

  const goToNextPage = () => {
    setOffset(offset + limit);
  };

  const goToPreviousPage = () => {
    setOffset(Math.max(0, offset - limit));
  };

  return (
    <div className="pokedex-container">
      <header className="pokedex-header">
        <img 
          src={PokeLogo}
          alt="Pokémon"
          className="pokemon-logo"
        />
      </header>
      <div className="pokedex-grid">
        {pokemons.map(pokemon => (
          <div className="card" key={pokemon.name}>
            <Link to={`/${pokemon.name}`}>
              <img src={pokemon.imageUrl} alt={pokemon.name} className="pokemon-image" />
              <h2 className="pokemon-name">{pokemon.name}</h2>
            </Link>
          </div>
        ))}
      </div>
      <div className="navigation-buttons">
        <button onClick={goToPreviousPage} disabled={offset === 0}>Previous Page</button>
        <button onClick={goToNextPage}>Next Page</button>
      </div>
    </div>
  );
};

export default Pokedex;
