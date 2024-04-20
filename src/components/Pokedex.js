import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Pokedex.css'; 
import PokeLogo from '../logo/PokeLogo.png';

const typeColors = {
  fire: '#FDDFDF',
  grass: '#DEFDE0',
  electric: '#FCF7DE',
  water: '#DEF3FD',
  ground: '#f4e7da',
  rock: '#d5d5d4',
  fairy: '#fceaff',
  poison: '#98d7a5',
  bug: '#f8d5a3',
  dragon: '#97b3e6',
  psychic: '#eaeda1',
  flying: '#F5F5F5',
  fighting: '#E6E0D4',
  normal: '#F5F5F5',
};


const Pokedex = () => {
  const [pokemons, setPokemons] = useState([]);
  const [offset, setOffset] = useState(0);
  const limit = 20;
  const currentPageUrl = `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`;

  useEffect(() => {
    axios.get(currentPageUrl).then(res => {
      const promises = res.data.results.map(pokemon => {
        return axios.get(pokemon.url).then(pokemonRes => {
          const types = pokemonRes.data.types.map(t => t.type.name);
          const typeColor = types[0] ? typeColors[types[0]] : '#F5F5F5';
          return {
            ...pokemon,
            imageUrl: pokemonRes.data.sprites.front_default,
            types,
            typeColor
          };
        });
      });
      Promise.all(promises).then(pokemonsData => {
        setPokemons(pokemonsData);
      });
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
      <div className="navigation-buttons">
        <button onClick={goToPreviousPage} disabled={offset === 0}>Previous Page</button>
        <button onClick={goToNextPage}>Next Page</button>
      </div>
      <div className="pokedex-grid">
      {pokemons.map(pokemon => (
        <div 
          className="card" 
          key={pokemon.name} 
          style={{ backgroundColor: pokemon.typeColor }} 
        >
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
