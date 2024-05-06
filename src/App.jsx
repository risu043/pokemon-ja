import { useEffect, useState } from 'react';
import Card from './components/Card/Card.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import { getAllPokemon, getPokemon } from './utils/pokemon.js';
import './App.css';

function App() {
  const initialURL = 'https://pokeapi.co/api/v2/pokemon';
  // const initialURL = 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0';
  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState([]);
  const [nextURL, setNextURL] = useState('');
  const [prevURL, setPrevURL] = useState('');

  const loadPokemonDetails = async (data) => {
    // ポケモン配列から1階層目の詳細データを取得
    let _pokemonData = await Promise.all(
      data.map((pokemon) => {
        let pokemonRecord = getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );

    console.log(_pokemonData);

    // ポケモン配列から2階層目の詳細データを取得
    let _pokemonDetails = await Promise.all(
      _pokemonData.map((pokemon) => {
        let pokemonRecord = getPokemon(pokemon.species.url);
        return pokemonRecord;
      })
    );

    // ポケモンの日本語プロパティを取得（名前・テキスト）
    let pokemonNamesAndText = _pokemonDetails.map((pokemon) => {
      let jaName = pokemon.names.find(
        (entry) => entry.language.name === 'ja-Hrkt'
      ).name;
      let jaText = pokemon.flavor_text_entries.find(
        (entry) => entry.language.name === 'ja-Hrkt'
      ).flavor_text;

      return {
        name: jaName,
        text: jaText,
      };
    });

    // タイプに関する詳細なデータを含むurlを取得
    let pokemonTypesUrl = _pokemonData.map((pokemon) => {
      let typesURL = pokemon.types.map((type) => type.type.url);
      return typesURL;
    });

    // ポケモンの日本語プロパティを取得（タイプ）
    let pokemonTypes = await Promise.all(
      pokemonTypesUrl.map(async (urlArray) => {
        let pokemonTypesData = await Promise.all(
          urlArray.map(async (url) => {
            let pokemonTypeDetail = await getPokemon(url);
            let jaName = pokemonTypeDetail.names.find(
              (name) => name.language.name === 'ja-Hrkt'
            ).name;
            return jaName;
          })
        );
        return pokemonTypesData;
      })
    );

    // アビリティに関する詳細なデータを含むurlを取得
    let pokemonAbilitiesUrl = _pokemonData.map((pokemon) => {
      let abilityURL = pokemon.abilities.map((ability) => ability.ability.url);
      return abilityURL;
    });

    // ポケモンの日本語プロパティを取得（アビリティ）
    let pokemonAbilities = await Promise.all(
      pokemonAbilitiesUrl.map(async (urlArray) => {
        let pokemonAbilitiesData = await Promise.all(
          urlArray.map(async (url) => {
            let pokemonAbilityDetail = await getPokemon(url);
            let jaName = pokemonAbilityDetail.names.find(
              (name) => name.language.name === 'ja-Hrkt'
            ).name;
            return jaName;
          })
        );
        return pokemonAbilitiesData;
      })
    );

    // ポケモンの詳細データに日本語プロパティを追加
    const _pokemonDetailsData = _pokemonData.map((pokemon, index) => {
      return {
        ...pokemon,
        janame: pokemonNamesAndText[index].name,
        text: pokemonNamesAndText[index].text,
        jatypes: pokemonTypes[index],
        jaabilities: pokemonAbilities[index],
      };
    });
    setPokemonData(_pokemonDetailsData);
    console.log(_pokemonDetailsData);
  };

  useEffect(() => {
    const fetchPokemonData = async () => {
      // 20匹のポケモン配列を取得
      let res = await getAllPokemon(initialURL);
      // 各ポケモンの詳細なデータを取得
      loadPokemonDetails(res.results);
      // 次ページ、前ページのデータを準備
      setNextURL(res.next);
      setPrevURL(res.previous);
      setLoading(false);
    };
    fetchPokemonData();
  }, []);

  const handleNextPage = async () => {
    setLoading(true);
    let data = await getAllPokemon(nextURL);
    await loadPokemonDetails(data.results);
    setNextURL(data.next);
    setPrevURL(data.previous);
    setLoading(false);
  };

  const handlePrevPage = async () => {
    if (!prevURL) return;
    setLoading(true);
    let data = await getAllPokemon(prevURL);
    await loadPokemonDetails(data.results);
    setNextURL(data.next);
    setPrevURL(data.previous);
    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <div className="App">
        {loading ? (
          <div className="loading"></div>
        ) : (
          <>
            <div className="pokemonCardContainer container mx-auto w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-x-4 md:gap-x-8 gap-y-12 pb-16 px-4">
              {pokemonData.map((pokemon, i) => {
                return <Card key={i} pokemon={pokemon} />;
              })}
            </div>
            <div className="bg-glay py-12">
              <div className="button_wrapper container mx-auto flex justify-center gap-8">
                <button
                  className="bg-blue text-xl py-4 px-12 rounded-full text-white hover:opacity-70 transition"
                  onClick={handlePrevPage}
                >
                  前へ
                </button>
                <button
                  className="bg-blue text-xl py-4 px-12 rounded-full text-white hover:opacity-70 transition"
                  onClick={handleNextPage}
                >
                  次へ
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;
