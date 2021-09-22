import React from 'react';

import { SearchBreeds } from './SearchBreeds';
import { SortAddedImages } from './SortAddedImages';
import { MobileMenu } from './MobileMenu';

export const TopSort = () => {
  return (
    <>
      <div className="vote__top">
        <SearchBreeds />
        <MobileMenu />
        <div className="sort">
          <SortAddedImages />
        </div>
      </div>
    </>
  );
};
