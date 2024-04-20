import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './PokemonDetails.css';
import PokeLogo from '../logo/PokeLogo.png';

const PokemonDetails = () => {
  const { pokemonName } = useParams();
  const [pokemonDetails, setPokemonDetails] = useState(null);

  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`).then(res => {
      setPokemonDetails(res.data);
    });
  }, [pokemonName]);

  return (
    <div className="pokemon-details-container">
    <header className="pokedex-header">
      <img 
        src={PokeLogo}
        alt="Pokémon"
        className="pokemon-logo"
      />
    </header>
    
      {pokemonDetails ? (
        <div className="pokemon-details">
          <h1>{pokemonDetails.name}</h1>
          <img 
            src={pokemonDetails.sprites.front_default} 
            alt={pokemonDetails.name} 
            className="pokemon-image" 
          />
          <div className="stat-item">
            <span className="stat-name">Type:</span>
            {pokemonDetails.types.map(typeInfo => typeInfo.type.name).join(', ')}
          </div>
          <div className="stat-item">
            <span className="stat-name">Height:</span> {pokemonDetails.height}
          </div>
          <div className="stat-item">
            <span className="stat-name">Weight:</span> {pokemonDetails.weight}
          </div>
          <div className="stat-item">
            <span className="stat-name">Abilities:</span>
            {pokemonDetails.abilities.map(abilityInfo => abilityInfo.ability.name).join(', ')}
          </div>
       </div>

      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default PokemonDetails;
