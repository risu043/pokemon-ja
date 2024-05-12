import { useEffect, useState } from 'react';
import {
  getAllPokemon,
  getPokemon,
  loadPokemonDetails,
} from './utils/pokemon.js';
import Card from './components/Card/Card.jsx';

const SerchPage = () => {
  const [names, setNames] = useState([]);
  const [title, setTitle] = useState([]);
  const [items, setItems] = useState([]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (title === '') {
      return;
    }

    let translate = names.filter((pokemon) => pokemon.jaName.match(title));
    let enNames = translate.map((pokemon) => pokemon.name);
    console.log(enNames);

    const res = await getAllPokemon(
      'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0'
    );

    let targetData = res.results.filter((pokemon) => {
      if (enNames.includes(pokemon.name)) {
        return pokemon;
      }
    });

    const _pokemonDetailsData = await loadPokemonDetails(targetData);
    setItems(_pokemonDetailsData);
  };

  useEffect(() => {
    const pokemonNames = async () => {
      const res = await getAllPokemon(
        'https://pokeapi.co/api/v2/pokemon-species?limit=10000&offset=0'
      );
      let _pokemonNameData = await Promise.all(
        res.results.map((pokemon) => {
          let pokemonRecord = getPokemon(pokemon.url);
          return pokemonRecord;
        })
      );
      let _pokemonNames = _pokemonNameData.map((pokemon) => {
        let jaName = pokemon.names.find(
          (entry) => entry.language.name === 'ja-Hrkt'
        ).name;

        return {
          name: pokemon.name,
          jaName: jaName,
        };
      });

      setNames(_pokemonNames);
    };
    pokemonNames();
  }, []);
  return (
    <div className="container">
      <div>
        <form onSubmit={handleFormSubmit}>
          <div className="form-inner flex justify-center mb-12">
            <input
              name="title"
              value={title}
              className="form-input mr-4 p-4 border-soid border border-darkGlay focus:outline-none focus:border-violet-500"
              placeholder="ポケモンの名前を入力"
              onChange={handleTitleChange}
            />
            <button className="form-button mr-4 p-4 bg-blue text-white">
              検索
            </button>
          </div>
        </form>
      </div>
      <div className="pokemonCardContainer container mx-auto w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-x-4 md:gap-x-8 gap-y-12 pb-16 px-4">
        {items.map((pokemon, i) => {
          return <Card key={i} pokemon={pokemon} />;
        })}
      </div>
    </div>
  );
};

export default SerchPage;
