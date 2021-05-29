import React from 'react';
import { Link, Route } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { Intro, Promo, ToggleMode } from '../components';
import {
  BreedsPage,
  DislikesPage,
  DogPage,
  FavoritesPage,
  GalleryPage,
  LikesPage,
  VotePage,
} from '../pages';
import { useRootStore } from '../store/RootState.Context';

import logoSvg from '../assets/img/logo.svg';

const AppInitialize = observer(() => {
  const { dogsStore } = useRootStore();

  React.useEffect(() => {
    if (localStorage.getItem('darkMode')) {
      const isDarkMode = localStorage.getItem('darkMode');
      dogsStore.setDarkMode(JSON.parse(isDarkMode || ''));
      dogsStore.isDarkMode
        ? document.querySelector<HTMLElement>('body')?.classList.add('dark')
        : document.querySelector<HTMLElement>('body')?.classList.remove('dark');
    }
  }, [dogsStore]);

  return (
    <div className="box">
      <div className="container">
        <div className="box-wrapper">
          <div className="left-section">
            <div className="top">
              <Link to="/">
                <img src={logoSvg} alt="logo svg" />
              </Link>
              <ToggleMode />
            </div>
            <Intro />
          </div>
          <div className="right-section">
            <Route path="/" component={Promo} exact />
            <Route path="/vote" component={VotePage} />
            <Route path="/breeds" component={BreedsPage} exact />
            <Route path="/breeds/dog" component={DogPage} exact />
            <Route path="/gallery" component={GalleryPage} />
            <Route path="/likes" component={LikesPage} />
            <Route path="/dislikes" component={DislikesPage} />
            <Route path="/favorites" component={FavoritesPage} />
          </div>
        </div>
      </div>
    </div>
  );
});

export default AppInitialize;
