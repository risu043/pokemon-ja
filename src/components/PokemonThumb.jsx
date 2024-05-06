import React from 'react';

const PokemonThumb = ({ id, name, image, type }) => {
  return (
    <div>
      <div>#0{id}</div>
      <div>{name}</div>
      <div>
        <img src={image} alt={name} />
      </div>
      <div>{type}</div>
    </div>
  );
};

export default PokemonThumb;
