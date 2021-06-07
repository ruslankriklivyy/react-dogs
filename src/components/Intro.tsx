import React from 'react';

import { Categories } from '.';
import { useRootStore } from '../store/RootState.Context';

const Intro = () => {
  const { filterStore } = useRootStore();

  return (
    <div className="intro">
      <h1 className="intro__title">Hi user!</h1>
      <p className="intro__text">Welcome to React Dogs</p>
      <h2 className="intro__suptitle">Lets start using React Dogs</h2>
      <nav className="navigation">
        <ul className="menu">
          {filterStore.menuCategories.map((item, index) => (
            <Categories key={index} {...item} />
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default React.memo(Intro);
