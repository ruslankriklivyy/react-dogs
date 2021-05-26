import React from 'react';
import { BackBtn, Button, TopSort } from '../components';
import { useRootStore } from '../store/RootState.Context';

import { observer } from 'mobx-react-lite';
import loaderGif from '../assets/img/loader.gif';
import { Link } from 'react-router-dom';

const numArr = [5, 10, 15, 20];

const BreedsPage = observer(() => {
  const { filterStore, dogsStore } = useRootStore();
  const [visibleBreeds, setVisibleBreeds] = React.useState(false);
  const [visibleLimit, setVisibleLimit] = React.useState(false);
  const popupRef = React.useRef<HTMLDivElement>(null);

  const onCloseBreeds = React.useCallback(() => {
    setVisibleBreeds(false);
  }, []);

  const onSelectLimitBreeds = (limit: number) => {
    filterStore.setLimitBreeds(limit);
  };

  const onSelectCurrentBreed = (name: string, id: number) => {
    filterStore.setBreedId(id);
    filterStore.setCurrentBreed(name);
  };

  const onSelectDog = (id: number) => {
    dogsStore.setDogId(id);
  };

  React.useEffect(() => {
    filterStore.fetchBreedsList(
      filterStore.currentBreed,
      filterStore.limitBreeds,
      filterStore.orderType,
      filterStore.searchQuery,
    );
  }, [
    filterStore,
    filterStore.currentBreed,
    filterStore.limitBreeds,
    filterStore.orderType,
    filterStore.searchQuery,
  ]);

  React.useEffect(() => {
    filterStore.fetchSortBreeds();
  }, [filterStore]);

  React.useEffect(() => {
    dogsStore.fetchDogsPhotos(filterStore.breedId);
  }, [dogsStore, filterStore.breedId]);

  const escapeListener = React.useCallback(
    (e) => {
      if (e.key === 'Escape') {
        onCloseBreeds();
      }
    },
    [onCloseBreeds],
  );
  const clickListener = React.useCallback(
    (e) => {
      const path = e.path || (e.composedPath && e.composedPath());
      if (!path.includes(popupRef.current)) {
        onCloseBreeds();
      }
    },
    [onCloseBreeds],
  );
  React.useEffect(() => {
    document.addEventListener('click', clickListener);
    document.addEventListener('keyup', escapeListener);
    return () => {
      document.removeEventListener('click', clickListener);
      document.removeEventListener('keyup', escapeListener);
    };
  }, [clickListener, escapeListener]);

  return (
    <div className="breeds">
      <TopSort />
      <div className="box-white">
        <div className="breeds-top">
          <BackBtn />
          <Button>Breeds</Button>
          <div
            className="sortby-breeds"
            onClick={() => setVisibleBreeds(!visibleBreeds)}
            ref={popupRef}>
            {visibleBreeds && (
              <div className="sortby-breeds-popup">
                <button onClick={() => filterStore.setCurrentBreed('All breeds')}>
                  All breeds
                </button>
                {filterStore.sortBreeds.map((item) => (
                  <button key={item.id} onClick={() => onSelectCurrentBreed(item.name, item.id)}>
                    {item.name}
                  </button>
                ))}
              </div>
            )}
            <span>{filterStore.currentBreed}</span>
            <svg
              width="12"
              height="8"
              viewBox="0 0 12 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M6.59406 7.17405L11.7538 2.01423C12.0821 1.68603 12.0821 1.15383 11.7538 0.825753C11.4256 0.497673 10.8935 0.497673 10.5655 0.825753L5.99993 5.39142L1.43458 0.825933C1.10635 0.497793 0.574264 0.497793 0.24617 0.825933C-0.0820567 1.15401 -0.0820567 1.68615 0.24617 2.01435L5.40591 7.17418C5.57003 7.33824 5.78492 7.42017 5.9999 7.42017C6.21498 7.42017 6.43002 7.33807 6.59406 7.17405Z"
                fill="#8C8C8C"
              />
            </svg>
          </div>
          <div className="sortby-limit" onClick={() => setVisibleLimit(!visibleLimit)}>
            {visibleLimit && (
              <div className="sortby-breeds-popup">
                {numArr.map((item) => (
                  <button key={item} onClick={() => onSelectLimitBreeds(item)}>
                    Limit: {item}
                  </button>
                ))}
              </div>
            )}
            <span>Limit: {filterStore.limitBreeds}</span>
            <svg
              width="12"
              height="8"
              viewBox="0 0 12 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M6.59406 7.17405L11.7538 2.01423C12.0821 1.68603 12.0821 1.15383 11.7538 0.825753C11.4256 0.497673 10.8935 0.497673 10.5655 0.825753L5.99993 5.39142L1.43458 0.825933C1.10635 0.497793 0.574264 0.497793 0.24617 0.825933C-0.0820567 1.15401 -0.0820567 1.68615 0.24617 2.01435L5.40591 7.17418C5.57003 7.33824 5.78492 7.42017 5.9999 7.42017C6.21498 7.42017 6.43002 7.33807 6.59406 7.17405Z"
                fill="#8C8C8C"
              />
            </svg>
          </div>
          <div className="sortby-az" onClick={() => filterStore.setOrderType('asc')}>
            <svg
              width="19"
              height="20"
              viewBox="0 0 19 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4 0.195262C4.26035 -0.0650874 4.68246 -0.0650874 4.94281 0.195262L8.94281 4.19526L8 5.13807L5.13807 2.27614V20H3.80474V2.27614L0.942809 5.13807L0 4.19526L4 0.195262ZM15.1381 1.33333C14.0335 1.33333 13.1381 2.22876 13.1381 3.33333V5.33333H17.1381V3.33333C17.1381 2.22876 16.2426 1.33333 15.1381 1.33333ZM17.1381 6.66667V9.33333H18.4714V3.33333C18.4714 1.49238 16.979 9.93411e-09 15.1381 9.93411e-09C13.2971 9.93411e-09 11.8047 1.49238 11.8047 3.33333V9.33333H13.1381V6.66667H17.1381ZM11.8047 10.6667H15.8047C17.2775 10.6667 18.4714 11.8606 18.4714 13.3333C18.4714 14.1298 18.1222 14.8447 17.5686 15.3333C18.1222 15.822 18.4714 16.5369 18.4714 17.3333C18.4714 18.8061 17.2775 20 15.8047 20H11.8047V10.6667ZM15.8047 14.6667C16.5411 14.6667 17.1381 14.0697 17.1381 13.3333C17.1381 12.597 16.5411 12 15.8047 12H13.1381V14.6667H15.8047ZM13.1381 16H15.8047C16.5411 16 17.1381 16.597 17.1381 17.3333C17.1381 18.0697 16.5411 18.6667 15.8047 18.6667H13.1381V16Z"
                fill="#8C8C8C"
              />
            </svg>
          </div>
          <div className="sortby-za" onClick={() => filterStore.setOrderType('desc')}>
            <svg
              width="19"
              height="20"
              viewBox="0 0 19 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4 0.195262C4.26035 -0.0650874 4.68246 -0.0650874 4.94281 0.195262L8.94281 4.19526L8 5.13807L5.13807 2.27614V20H3.80474V2.27614L0.942809 5.13807L0 4.19526L4 0.195262ZM15.1381 1.33333C14.0335 1.33333 13.1381 2.22876 13.1381 3.33333V5.33333H17.1381V3.33333C17.1381 2.22876 16.2426 1.33333 15.1381 1.33333ZM17.1381 6.66667V9.33333H18.4714V3.33333C18.4714 1.49238 16.979 9.93411e-09 15.1381 9.93411e-09C13.2971 9.93411e-09 11.8047 1.49238 11.8047 3.33333V9.33333H13.1381V6.66667H17.1381ZM11.8047 10.6667H15.8047C17.2775 10.6667 18.4714 11.8606 18.4714 13.3333C18.4714 14.1298 18.1222 14.8447 17.5686 15.3333C18.1222 15.822 18.4714 16.5369 18.4714 17.3333C18.4714 18.8061 17.2775 20 15.8047 20H11.8047V10.6667ZM15.8047 14.6667C16.5411 14.6667 17.1381 14.0697 17.1381 13.3333C17.1381 12.597 16.5411 12 15.8047 12H13.1381V14.6667H15.8047ZM13.1381 16H15.8047C16.5411 16 17.1381 16.597 17.1381 17.3333C17.1381 18.0697 16.5411 18.6667 15.8047 18.6667H13.1381V16Z"
                fill="#8C8C8C"
              />
            </svg>
          </div>
        </div>
        {filterStore.searchQuery !== '' || filterStore.currentBreed !== 'All breeds' ? (
          <p className="current-breeds">
            Search results for:{' '}
            <strong>{filterStore.searchQuery || filterStore.currentBreed}</strong>
          </p>
        ) : null}
        {filterStore.isFetching ? (
          <div className="breeds-dogs">
            {filterStore.breeds.map((item, index) => (
              <Link
                to={`/dog`}
                className={`breeds-dogs__item breeds-dogs__item--${index + 1}`}
                onClick={() => onSelectDog(item.id)}>
                <div className="breeds-dogs__box">
                  <div className="breeds-dogs__blockout">
                    <span>{item.name}</span>
                  </div>
                  <img src={item.image?.url ?? dogsStore.dogsPhotos[0]?.url} alt="dog jpg" />
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="loader">
            <img src={loaderGif} alt="loader gif" />
          </div>
        )}
      </div>
    </div>
  );
});

export default BreedsPage;
