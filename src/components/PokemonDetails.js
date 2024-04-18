import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const PokemonDetails = () => {
  const { pokemonName } = useParams();
  const [pokemonDetails, setPokemonDetails] = useState(null);

  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`).then(res => {
      setPokemonDetails(res.data);
    });
  }, [pokemonName]);

  return (
    <div>
      {pokemonDetails ? (
        <div>
          <h1>{pokemonDetails.name}</h1>
          <img src={pokemonDetails.sprites.front_default} alt={pokemonDetails.name} />
          <p>Type: {pokemonDetails.types.map(typeInfo => typeInfo.type.name).join(', ')}</p>
          <p>Height: {pokemonDetails.height}</p>
          <p>Weight: {pokemonDetails.weight}</p>
          <p>Abilities: {pokemonDetails.abilities.map(abilityInfo => abilityInfo.ability.name).join(', ')}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default PokemonDetails;
