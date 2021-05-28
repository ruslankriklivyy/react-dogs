import { observer } from 'mobx-react-lite';
import React from 'react';
import loaderGif from '../assets/img/loader.gif';
import loaderDarkGif from '../assets/img/loader-dark.gif';
import { useRootStore } from '../store/RootState.Context';

const Prelaoder = observer(() => {
  const { dogsStore } = useRootStore();

  return (
    <div className="loader">
      {!dogsStore.isDarkMode ? (
        <img src={loaderGif} alt="loader gif" />
      ) : (
        <img src={loaderDarkGif} alt="loader dark gif" />
      )}
    </div>
  );
});

export default Prelaoder;
