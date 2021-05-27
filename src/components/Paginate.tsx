import React from 'react';
import { Button } from '.';
import { useRootStore } from '../store/RootState.Context';

const Paginate = () => {
  const { filterStore } = useRootStore();

  const onPlusCurrentPage = () => {
    filterStore.setCurrentPage(filterStore.currentPage + 1);
  };

  const onMinusCurrentPage = () => {
    if (filterStore.currentPage > 0) {
      filterStore.setCurrentPage(filterStore.currentPage - 1);
    }
  };

  return (
    <div className="paginate">
      {filterStore.currentPage > 0 && (
        <Button onClick={() => onMinusCurrentPage()} className={'btn btn--paginate'}>
          Prev page
        </Button>
      )}
      <Button onClick={() => onPlusCurrentPage()} className={'btn btn--paginate'}>
        Next page
      </Button>
    </div>
  );
};

export default Paginate;
