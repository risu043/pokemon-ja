import React from 'react';
import { useState, useEffect } from 'react';
import './Card.css';

const Card = ({ pokemon }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    setIsModalOpen(true);
  };
  const handleClickClose = () => {
    setIsModalOpen(false);
  };

  // モダール表示に関するスクロール制御
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isModalOpen]);

  let modal;
  if (isModalOpen) {
    modal = (
      <div className="modal" onClick={handleClickClose}>
        <div className="modal-inner font-zenKaku">
          <div>
            <img
              src={pokemon.sprites.other['official-artwork'].front_default}
              alt="{pokemon.ja}"
            />
          </div>
          <h3 className="font-zenKaku text-2xl mb-2 font-black">
            <span className="font-gill mr-2">No.{pokemon.id}</span>
            {pokemon.janame}
          </h3>
          <div className="flex">
            <div>タイプ：</div>
            {pokemon.jatypes.map((type) => {
              return (
                <div className="mr-2" key={type}>
                  {type}
                </div>
              );
            })}
          </div>
          <div>
            <div>
              <div>
                <p>
                  おもさ：
                  <span className="tracking-widest">
                    {pokemon.weight / 10}kg
                  </span>
                </p>
              </div>
              <div>
                <p>
                  たかさ：
                  <span className="tracking-widest">
                    {pokemon.height / 10}m
                  </span>
                </p>
              </div>
            </div>
            <div className="flex flex-wrap mb-2">
              <div>のうりょく：</div>
              {pokemon.jaabilities.map((ability) => {
                return (
                  <div className="mr-2" key={ability}>
                    {ability}
                  </div>
                );
              })}
            </div>
            <div>
              <p>{pokemon.text}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div
        className="shadow-lg rounded-2xl hover:shadow-xl transition-all p-4"
        onClick={handleClick}
      >
        <div>
          <img className=" w-full" src={pokemon.sprites.front_default} alt="" />
        </div>
        <h3 className="font-zenKaku text-center text-2xl mb-4">
          {pokemon.janame}
        </h3>
      </div>
      {modal}
    </div>
  );
};

export default Card;
