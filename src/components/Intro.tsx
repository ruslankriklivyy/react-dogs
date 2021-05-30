import React from 'react';

import voteTablePng from '../assets/img/vote-table.png';
import petBreedsPng from '../assets/img/pet-breeds.png';
import galleryPng from '../assets/img/images-search.png';
import { Categories } from '.';

const menuArr = [
  { id: 1, title: 'Voting', img: voteTablePng, color: '#B4B7FF', link: 'vote' },
  { id: 2, title: 'BREEDS', img: petBreedsPng, color: '#97EAB9', link: 'breeds' },
  { id: 3, title: 'gallery', img: galleryPng, color: '#FFD280', link: 'gallery' },
];

const Intro = () => {
  return (
    <div className="intro">
      <h1 className="intro__title">Hi user!</h1>
      <p className="intro__text">Welcome to React Dogs</p>
      <h2 className="intro__suptitle">Lets start using React Dogs</h2>
      <nav className="navigation">
        <ul className="menu">
          {menuArr.map((item) => (
            <Categories {...item} />
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default React.memo(Intro);
