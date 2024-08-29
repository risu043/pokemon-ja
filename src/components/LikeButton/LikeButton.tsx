import { useState, useEffect } from 'react';
import { FaHeart } from 'react-icons/fa';
import { CardProps } from '../../utils/type.ts';
import './LikeButton.css';

const LikeButton: React.FC<CardProps> = ({ pokemon }) => {
  const [liked, setLiked] = useState(false);
  const [isLikeAnimating, setIsLikeAnimating] = useState(false);
  const [isUnlikeAnimating, setIsUnlikeAnimating] = useState(false);

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
      setIsLikeAnimating(true);
      setTimeout(() => setIsLikeAnimating(false), 300);
    } else {
      // お気に入り済みならlocalStrageからポケモンデータを削除しお気に入り解除
      setLiked(false);
      setIsUnlikeAnimating(true);
      setTimeout(() => setIsUnlikeAnimating(false), 300);
      localStorage.removeItem(key);
    }
  };

  return (
    <>
      <FaHeart
        className={`button ${liked ? 'like' : 'unlike'} ${
          isLikeAnimating ? 'like-animation' : ''
        } ${isUnlikeAnimating ? 'unlike-animation' : ''}`}
        onClick={toggleLiked}
      />
    </>
  );
};

export default LikeButton;
