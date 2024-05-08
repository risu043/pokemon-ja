import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { getAllPokemon, getPokemon } from './utils/pokemon.js';
import Navbar from './components/Navbar/Navbar.jsx';
import Card from './components/Card/Card.jsx';

import './App.css';

function App() {
  const [items, setItems] = useState([]);
  console.log(items);

  // 総ページ数
  const [pageCount, setpageCount] = useState(0);

  // １ページあたりのポケモンの数
  let limit = 20;
  const [loading, setLoading] = useState(true);

  const loadPokemonDetails = async (data) => {
    // ポケモン配列から1階層目の詳細データを取得
    let _pokemonData = await Promise.all(
      data.map((pokemon) => {
        let pokemonRecord = getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );

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
      let jaText = '';
      if (pokemon.flavor_text_entries) {
        let flavorTextEntry = pokemon.flavor_text_entries.find(
          (entry) => entry.language.name === 'ja-Hrkt'
        );
        if (flavorTextEntry && flavorTextEntry.flavor_text) {
          jaText = flavorTextEntry.flavor_text;
        }
      }

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

    setItems(_pokemonDetailsData);
  };

  useEffect(() => {
    const getComments = async () => {
      const res = await getAllPokemon(
        `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=0`
      );

      const total = res.count;
      setpageCount(Math.ceil(total / limit));

      loadPokemonDetails(res.results);
      setLoading(false);
    };

    getComments();
  }, [limit]);

  const fetchComments = async (offset) => {
    // setLoading(true);
    const res = await getAllPokemon(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
    );
    loadPokemonDetails(res.results);
    // setLoading(false);
  };

  const handlePageClick = async (data) => {
    console.log(data.selected);

    let offset = data.selected * limit;
    fetchComments(offset);
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
              {items.map((pokemon, i) => {
                return <Card key={i} pokemon={pokemon} />;
              })}
            </div>
            <div className="bg-glay py-12">
              <ReactPaginate
                previousLabel={'previous'}
                nextLabel={'next'}
                breakLabel={'...'}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={3}
                onPageChange={handlePageClick}
                containerClassName={'pagination'}
                pageClassName={'page-item'}
                pageLinkClassName={'page-link'}
                previousClassName={'previous-item'}
                previousLinkClassName={'previous-link'}
                nextClassName={'next-item'}
                nextLinkClassName={'next-link'}
                breakClassName={'break-item'}
                breakLinkClassName={'break-link'}
                activeClassName={'active'}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;
