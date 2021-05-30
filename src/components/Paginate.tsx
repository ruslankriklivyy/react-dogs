import React from 'react';
import { Button } from '.';

interface IPaginate {
  setCurrentPage: (page: number) => void;
  currentPage: number;
}

const Paginate: React.FC<IPaginate> = ({ currentPage, setCurrentPage }) => {
  const onPlusCurrentPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const onMinusCurrentPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="paginate">
      {currentPage > 0 && (
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

export default React.memo(Paginate);
