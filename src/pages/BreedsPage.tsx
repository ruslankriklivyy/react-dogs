import React from 'react';
import {
  BackBtn,
  BreedsOrder,
  Button,
  Paginate,
  Preloader,
  SortByTitle,
  TopSort,
} from '../components';
import { useRootStore } from '../store/RootState.Context';

import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';

const BreedsPage = observer(() => {
  const { filterStore, dogsStore } = useRootStore();

  const onPlusCurrentPage = () => {
    filterStore.setCurrentPage(filterStore.currentPage + 1);
  };

  const onMinusCurrentPage = () => {
    if (filterStore.currentPage > 0) {
      filterStore.setCurrentPage(filterStore.currentPage - 1);
    }
  };

  const onSelectDog = (id: number) => {
    dogsStore.setDogId(id);
  };

  const onSelectLimitBreeds = (limit: number) => {
    filterStore.setLimitBreeds(limit);
  };

  const onSelectCurrentBreed = (name: string, id: number) => {
    filterStore.setBreedId(id);
    filterStore.setCurrentBreed(name);
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
          <Button>Breeds</Button>
          <BreedsOrder
            items={filterStore.sortBreeds}
            currentBreed={filterStore.currentBreed}
            setCurrentBreed={filterStore.setCurrentBreed}
            onSelectCurrentBreed={onSelectCurrentBreed}
            type={'All breeds'}
          />
          <BreedsOrder
            limit
            onSelectLimitBreeds={onSelectLimitBreeds}
            limitBreeds={filterStore.limitBreeds}
          />
          <SortByTitle />
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
              {filterStore.breeds.map((item, index) => (
                <Link
                  to="/breeds/dog"
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
            <Paginate
              onPlusCurrentPage={onPlusCurrentPage}
              onMinusCurrentPage={onMinusCurrentPage}
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

export default BreedsPage;
