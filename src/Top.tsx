import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
// import { ReactPaginateProps } from 'react-paginate';
import { getAllPokemon, loadPokemonDetails } from './utils/pokemon.ts';
import { PokemonResponse, PokemonPropaties } from './utils/type.ts';
import Card from './components/Card/Card.tsx';
import './Top.css';

function Top() {
  // 現在いるページのポケモンデータ
  const [items, setItems] = useState<PokemonPropaties[]>([]);

  // 総ページ数
  const [pageCount, setpageCount] = useState<number>(0);

  // １ページあたりのポケモンの数
  let limit = 20;

  // 現在いるページのポケモンデータが表示されるまでloading
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // トップページのポケモンデータを取得
    const getTopPokemon = async (): Promise<void> => {
      const res: PokemonResponse = await getAllPokemon(
        `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=0`
      );

      const total = res.count;
      setpageCount(Math.ceil(total / limit));

      const pokemonPropaties = await loadPokemonDetails(res.results);
      setItems(pokemonPropaties);
      setLoading(false);
    };

    getTopPokemon();
  }, [limit]);

  // ページネーション先のポケモンデータを取得
  const getCurrentPokemon = async (offset: number): Promise<void> => {
    const res: PokemonResponse = await getAllPokemon(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
    );
    const _pokemonDetailsData = await loadPokemonDetails(res.results);
    setItems(_pokemonDetailsData);
  };

  // ページネーションをクリックした時の処理
  const handlePageClick = async (data: { selected: number }): Promise<void> => {
    // console.log(data.selected);
    let offset: number = data.selected * limit;
    getCurrentPokemon(offset);
  };

  return (
    <>
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

export default Top;
