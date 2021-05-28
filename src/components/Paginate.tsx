import React from 'react';
import { Button } from '.';

interface IPaginate {
  onMinusCurrentPage: () => void;
  onPlusCurrentPage: () => void;
  currentPage: number;
}

const Paginate: React.FC<IPaginate> = ({ onMinusCurrentPage, onPlusCurrentPage, currentPage }) => {
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

export default Paginate;
