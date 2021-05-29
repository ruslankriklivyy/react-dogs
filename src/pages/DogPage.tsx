import { observer } from 'mobx-react-lite';
import React from 'react';
import { BackBtn, Button, Preloader, TopSort } from '../components';
import { useRootStore } from '../store/RootState.Context';

const DogPage = observer(() => {
  const { dogsStore } = useRootStore();

  React.useEffect(() => {
    dogsStore.fetchOneDog(dogsStore.dogId);
  }, [dogsStore, dogsStore.dogId]);

  return (
    <div className="dog">
      <TopSort />
      <div className="box-white">
        <div className="breeds-top">
          <BackBtn />
          <Button>Breeds</Button>
          <Button>{dogsStore.dogId}</Button>
        </div>
        <div className="dog-box">
          {dogsStore.isFetching ? (
            <>
              <div className="dog-image">
                <img src={dogsStore.oneDog[0]?.url} alt="dog img" />
              </div>
              <div className="dog-info">
                <div className="dog-info__top">
                  <h2 className="dog-info__name">{dogsStore.oneDog[0]?.breeds[0].name}</h2>
                  <h4 className="dog-info__bredfor">{dogsStore.oneDog[0]?.breeds[0].bred_for}</h4>
                </div>
                <div className="dog-info__bottom">
                  <div className="dog-info__item">
                    <span>Temperament:</span>
                    <p>{dogsStore.oneDog[0]?.breeds[0].temperament}</p>
                  </div>
                  <div className="dog-info__item">
                    <div className="dog-info__item-block">
                      <span>Height: </span>
                      <p>{dogsStore.oneDog[0]?.breeds[0].height.imperial}</p>
                    </div>
                    <div className="dog-info__item-block">
                      <span>Weight: </span>
                      <p>{dogsStore.oneDog[0]?.breeds[0].weight.imperial}</p>
                    </div>
                    <div className="dog-info__item-block">
                      <span>Life span: </span>
                      <p>{dogsStore.oneDog[0]?.breeds[0].life_span}</p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <Preloader />
          )}
        </div>
      </div>
    </div>
  );
});

export default DogPage;
