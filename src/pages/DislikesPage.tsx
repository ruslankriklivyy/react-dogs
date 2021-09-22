import React from 'react';

import { BackBtn } from '../components/Buttons/BackBtn';
import { Button } from '../components/Buttons/Button';
import { EmptyItems } from '../components/EmptyItems';
import { TopSort } from '../components/RightHead/TopSort';

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
