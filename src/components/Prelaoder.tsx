import React from 'react';
import loaderGif from '../assets/img/loader.gif';

const Prelaoder = () => {
  return (
    <div className="loader">
      <img src={loaderGif} alt="loader gif" />
    </div>
  );
};

export default Prelaoder;
