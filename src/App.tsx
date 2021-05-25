import React from 'react';

import logoSvg from './assets/img/logo.svg';
import voteTablePng from './assets/img/vote-table.png';
import petBreedsPng from './assets/img/pet-breeds.png';
import galleryPng from './assets/img/images-search.png';

import { Link, Route } from 'react-router-dom';
import { Promo } from './components';
import { BreedsPage, VotePage } from './pages';

const menuArr = [
  { id: 1, title: 'Voting', img: voteTablePng, color: '#B4B7FF', link: 'vote' },
  { id: 2, title: 'BREEDS', img: petBreedsPng, color: '#97EAB9', link: 'breeds' },
  { id: 3, title: 'gallery', img: galleryPng, color: '#FFD280', link: 'gallery' },
];

function App() {
  return (
    <div className="box">
      <div className="container">
        <div className="box-wrapper">
          <div className="left-section">
            <div className="top">
              <a href="/">
                <img src={logoSvg} alt="logo svg" />
              </a>
            </div>
            <div className="intro">
              <h1 className="intro__title">Hi user!</h1>
              <p className="intro__text">Welcome to React Dogs</p>
              <h2 className="intro__suptitle">Lets start using React Dogs</h2>
              <nav className="navigation">
                <ul className="menu">
                  {menuArr.map((item) => (
                    <li key={item.id} className="menu__item">
                      <Link to={`/${item.link}`} className="menu__item-link">
                        <div
                          className="menu__item-top"
                          style={{ backgroundColor: `${item.color}` }}>
                          <img src={item.img} alt="item png" />
                        </div>
                        <div className="menu__item-bottom">
                          <span>{item.title}</span>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
          <div className="right-section">
            <Route path="/" component={Promo} exact />
            <Route path="/vote" component={VotePage} />
            <Route path="/breeds" component={BreedsPage} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
