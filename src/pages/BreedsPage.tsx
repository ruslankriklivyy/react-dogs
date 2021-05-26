import React from 'react';
import {
  BackBtn,
  Button,
  Prelaoder,
  SortByBreeds,
  SortByLimit,
  SortByTitle,
  TopSort,
} from '../components';
import { useRootStore } from '../store/RootState.Context';

import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';

const BreedsPage = observer(() => {
  const { filterStore, dogsStore } = useRootStore();

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

  return (
    <div className="breeds">
      <TopSort />
      <div className="box-white">
        <div className="breeds-top">
          <BackBtn />
          <Button>Breeds</Button>
          <SortByBreeds />
          <SortByLimit />
          <SortByTitle />
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
          <Prelaoder />
        )}
      </div>
    </div>
  );
});

export default BreedsPage;
