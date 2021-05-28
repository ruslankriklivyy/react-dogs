import React from 'react';
import { BackBtn, Button, EmptyItems, TopSort } from '../components';

const DissLikesPage = () => {
  return (
    <div>
      <TopSort />
      <div className="box-white">
        <div className="evaluation-top">
          <BackBtn />
          <Button>Dislikes</Button>
        </div>
        <EmptyItems />
      </div>
    </div>
  );
};

export default DissLikesPage;