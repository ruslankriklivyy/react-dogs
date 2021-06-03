import React, { Suspense } from 'react';
import { Link, Route, Switch, useLocation } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import classNames from 'classnames';

import { Intro, Preloader, ToggleMode } from '../components';
import // BreedsPage,
// DislikesPage,
// DogPage,
// FavoritesPage,
// GalleryPage,
// LikesPage,
// VotePage,
'../pages';
import { useRootStore } from '../store/RootState.Context';

import logoSvg from '../assets/img/logo.svg';

const BreedsPage = React.lazy(() => import('../pages/BreedsPage'));
const DislikesPage = React.lazy(() => import('../pages/DislikesPage'));
const DogPage = React.lazy(() => import('../pages/DogPage'));
const FavoritesPage = React.lazy(() => import('../pages/FavoritesPage'));
const GalleryPage = React.lazy(() => import('../pages/GalleryPage'));
const LikesPage = React.lazy(() => import('../pages/LikesPage'));
const VotePage = React.lazy(() => import('../pages/VotePage'));
const Promo = React.lazy(() => import('../components/Promo'));

const AppInitialize = observer(() => {
  const location = useLocation();
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
          <div
            className={classNames({
              'left-section': location.pathname !== '/',
              'left-section show': location.pathname === '/',
            })}>
            <div className="top">
              <Link to="/">
                <img src={logoSvg} alt="logo svg" />
              </Link>
              <ToggleMode />
            </div>
            <Intro />
          </div>
          <div
            className={classNames({
              'right-section show': location.pathname !== '/',
              'right-section': location.pathname === '/',
            })}>
            <Suspense fallback={<Preloader />}>
              <Switch>
                <Route path="/breeds" component={BreedsPage} exact />
                <Route path="/" component={Promo} exact />
                <Route path="/vote" component={VotePage} />
                <Route path="/breeds/dog" component={DogPage} exact />
                <Route path="/gallery" component={GalleryPage} />
                <Route path="/likes" component={LikesPage} />
                <Route path="/dislikes" component={DislikesPage} />
                <Route path="/favorites" component={FavoritesPage} />
              </Switch>
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
});

export default AppInitialize;
