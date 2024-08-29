import { KeyboardEventHandler, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { getAllPokemon, loadPokemonDetails } from './utils/pokemon.ts';
import { PokemonProperties } from './utils/type.ts';
import Card from './components/Card/Card.tsx';
import './Search.css';
import translateData from './utils/taranslate.json';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const initialQuery = searchParams.get('query') || '';
  const [query, setQuery] = useState<string>(initialQuery);
  const [lastSearchQuery, setLastSearchQuery] = useState<string>('');
  const [items, setItems] = useState<PokemonProperties[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setQuery(e.target.value);
  };

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = async (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (query === '') {
        navigate('/search');
        setLastSearchQuery('');
        setItems([]);
        setError('ポケモンの名前を入力してください');
        return;
      }
      setLoading(true);
      navigate(`/search?query=${query}`);

      let enNames = translateData
        .filter((pokemon) => pokemon.jaName.includes(query))
        .map((pokemon) => pokemon.name);

      console.log(enNames);

      const res = await getAllPokemon(
        'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0'
      );

      let targetData = res.results.filter((pokemon) =>
        enNames.some((name) => pokemon.name.includes(name))
      );

      if (targetData.length === 0) {
        setError(`「${query}」に一致するポケモンが見つかりませんでした。`);
        setLastSearchQuery(query);
        setItems([]);
        setLoading(false);
        setQuery('');
        return;
      }

      const pokemonDetails = await loadPokemonDetails(targetData);
      setItems(pokemonDetails);
      setQuery('');
      setError('');
      setLastSearchQuery(query);
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto">
      <div>
        <form>
          <div className="flex justify-center mb-12">
            <input
              name="query"
              value={query}
              className="form-input"
              placeholder="ポケモンの名前を入力"
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
          </div>
        </form>
      </div>
      {loading ? (
        <div className="loading"></div>
      ) : (
        <>
          {items.length > 0 && (
            <p className="text-center mb-12">「{lastSearchQuery}」の検索結果</p>
          )}
          {error && <p className="text-center mb-12 error">{error}</p>}

          <div className="pokemonCardContainer container mx-auto w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-x-4 md:gap-x-8 gap-y-12 pb-16 px-4">
            {items.map((pokemon, i) => (
              <Card key={i} pokemon={pokemon} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SearchPage;
