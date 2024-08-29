import { useState, useEffect } from 'react';
import { FaHeart } from 'react-icons/fa';
import { CardProps } from '../../utils/type.ts';
import './LikeButton.css';

const LikeButton: React.FC<CardProps> = ({ pokemon }) => {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const key = `pokemon_${pokemon.id}`;
    const storedData = localStorage.getItem(key);
    if (storedData) {
      setLiked(true);
    }
  }, [pokemon.id]);

  const toggleLiked = () => {
    const key = `pokemon_${pokemon.id}`;
    let data = pokemon;
    let val = JSON.stringify(data);
    if (!liked) {
      // お気に入り未ならlocalStrageにポケモンデータを保存しお気に入り登録
      localStorage.setItem(key, val);
      setLiked(true);
    } else {
      // お気に入り済みならlocalStrageからポケモンデータを削除しお気に入り解除
      setLiked(false);
      localStorage.removeItem(key);
    }
  };

  return (
    <>
      <FaHeart
        className={liked ? 'like button' : 'unlike button'}
        onClick={toggleLiked}
      />
    </>
  );
};

export default LikeButton;
