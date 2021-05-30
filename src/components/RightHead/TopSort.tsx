import React from 'react';

import SearchBreeds from './SearchBreeds';
import SortAddedImages from './SortAddedImages';

const TopSort = () => {
  return (
    <>
      <div className="vote__top">
        <SearchBreeds />
        <div className="sort">
          <SortAddedImages />
        </div>
      </div>
    </>
  );
};

export default React.memo(TopSort);
