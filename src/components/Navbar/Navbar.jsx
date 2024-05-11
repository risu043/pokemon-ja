import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <div className="Navbar text-center py-12 md:py-16">
      <h1 className="font-dela text-5xl md:text-6xl tracking-wider mb-4">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-red to-blue">
          ポケモン図鑑
        </span>
      </h1>
      <p className="text-lg font-gill tracking-wide mb-4">
        by <a href="https://pokeapi.co/">PokeAPI</a>
      </p>
      <nav>
        <ul className="nav flex justify-center gap-4">
          <li>
            <Link to={'/'} className="font-zenKaku">
              いちらん
            </Link>
          </li>
          <li>
            <Link to={'/serch'} className="font-zenKaku">
              けんさく
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
