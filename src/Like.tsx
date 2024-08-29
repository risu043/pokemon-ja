import React, { useState, useEffect } from 'react';
import { PokemonProperties } from './utils/type.ts';
import Card from './components/Card/Card.tsx';
import './Like.css';

const LikedPokemonPage: React.FC = () => {
  // お気に入りポケモンのデータ
  const [likedPokemons, setLikedPokemons] = useState<PokemonProperties[]>([]);

  useEffect(() => {
    // localStorage 内のすべてのkeyを配列として取得
    const keys = Object.keys(localStorage);
    // localStorageからval（お気に入りポケモン）を配列として取得
    const pokemons = keys
      .map((key) => {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
      })
      // nullを場合を除外する
      .filter((pokemon) => pokemon !== null) as PokemonProperties[];
    // お気に入りポケモンをid順に並べる
    pokemons.sort((a, b) => a.id - b.id);
    setLikedPokemons(pokemons);
  }, []);

  const handleResetFavorites = () => {
    // ローカルストレージをクリア
    localStorage.clear();
    // likedPokemons の状態を空の配列に更新
    setLikedPokemons([]);
  };

  return (
    <>
      {likedPokemons.length === 0 && (
        <p className="text-center">おきにいりはまだありません</p>
      )}
      <div className="pokemonCardContainer container mx-auto w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-x-4 md:gap-x-8 gap-y-12 pb-16 px-4">
        {likedPokemons.map((pokemon, i) => {
          return <Card key={i} pokemon={pokemon} />;
        })}
      </div>

      {likedPokemons.length > 0 && (
        <button
          onClick={handleResetFavorites}
          className="bg-blue text-white reset-button"
        >
          おきにいりをリセットする
        </button>
      )}
    </>
  );
};

export default LikedPokemonPage;
