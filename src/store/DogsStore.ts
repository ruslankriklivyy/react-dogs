import { observable, action, makeObservable } from 'mobx';
import { fetchDogs, fetchOneDog } from '../api/api';
import { IDogsImages } from '../interfaces/interfaces';

export class DogsStore {
  @observable
  dogsPhotos: IDogsImages[] = [];
  oneDog: IDogsImages[] = [];
  dogId: number | null = null;
  isFetching: boolean = false;

  constructor() {
    makeObservable(this, {
      dogsPhotos: observable,
      oneDog: observable,
      isFetching: observable,
      fetchDogsPhotos: action,
      setDogId: action,
    });
  }

  @action
  fetchDogsPhotos = (breedId: number | null) => {
    fetchDogs(breedId).then((data) => (this.dogsPhotos = data));
  };

  @action
  fetchOneDog = (dogId: number | null) => {
    this.isFetching = false;
    fetchOneDog(dogId)
      .then((data) => (this.oneDog = data))
      .finally(() => (this.isFetching = true));
  };

  @action
  setDogId = (id: number) => {
    this.dogId = id;
  };
}
