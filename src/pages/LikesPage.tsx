import React from 'react';
import { BackBtn, Button, EmptyItems, TopSort } from '../components';

const LikesPage = () => {
  return (
    <div>
      <TopSort />
      <div className="box-white">
        <div className="evaluation-top">
          <BackBtn />
          <Button>Likes</Button>
        </div>
        <EmptyItems />
      </div>
    </div>
  );
};

export default LikesPage;
