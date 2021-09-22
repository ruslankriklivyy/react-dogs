import React from 'react';
import { useRootStore } from '../store/RootState.Context';
import { observer } from 'mobx-react-lite';

import { TopSort } from '../components/RightHead/TopSort';
import { BackBtn } from '../components/Buttons/BackBtn';
import { Button } from '../components/Buttons/Button';
import { BreedsOrder } from '../components/Breeds/BreedsOrder';
import { SortByTitle } from '../components/SortBy/SortByTitle';
import { BreedItem } from '../components/Breeds/BreedItem';
import { Paginate } from '../components/Paginate';
import { Preloader } from '../components/Preloader';

const BreedsPage = observer(() => {
  const { filterStore, dogsStore } = useRootStore();

  const onSelectDog = (id: number) => {
    dogsStore.setDogId(id);
  };

  const onSelectLimitBreeds = (limit: number) => {
    filterStore.setLimitBreeds(limit);
  };

  const clearSearchQuery = () => {
    filterStore.setSearchQuery('');
  };

  const onSelectCurrentBreed = (name: string, id: number) => {
    filterStore.setBreedId(id);
    filterStore.setCurrentBreed(name);
    clearSearchQuery();
  };

  React.useEffect(() => {
    filterStore.fetchBreedsList(
      filterStore.currentBreed,
      filterStore.limitBreeds,
      filterStore.orderType,
      filterStore.searchQuery,
      filterStore.currentPage,
    );
  }, [
    filterStore,
    filterStore.currentBreed,
    filterStore.limitBreeds,
    filterStore.orderType,
    filterStore.searchQuery,
    filterStore.currentPage,
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
          <Button onClick={clearSearchQuery}>Breeds</Button>
          <BreedsOrder
            items={filterStore.sortBreeds}
            currentBreed={filterStore.currentBreed}
            setCurrentBreed={filterStore.setCurrentBreed}
            onSelectCurrentBreed={onSelectCurrentBreed}
            type={'All breeds'}
          />
          <div className="breeds-sort-right">
            <BreedsOrder
              limit
              onSelectLimitBreeds={onSelectLimitBreeds}
              limitBreeds={filterStore.limitBreeds}
            />
            <SortByTitle />
          </div>
        </div>
        {filterStore.searchQuery !== '' || filterStore.currentBreed !== 'All breeds' ? (
          <p className="current-breeds">
            Search results for:
            <strong>{filterStore.searchQuery || filterStore.currentBreed}</strong>
          </p>
        ) : null}
        {filterStore.isFetching ? (
          <>
            <div className={`breeds-dogs breeds-dogs--${filterStore.limitBreeds}`}>
              {filterStore.breeds.map((item) => (
                <BreedItem
                  key={item.id}
                  name={item.name}
                  onSelectDog={onSelectDog}
                  image={item.image}
                  id={item.id}
                  dogsPhotos={dogsStore.dogsPhotos}
                />
              ))}
            </div>
            <Paginate
              setCurrentPage={filterStore.setCurrentPage}
              currentPage={filterStore.currentPage}
            />
          </>
        ) : (
          <Preloader />
        )}
      </div>
    </div>
  );
});

export default React.memo(BreedsPage);
