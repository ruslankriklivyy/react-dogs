import { observable, action, makeObservable } from 'mobx';
import { fetchDogs, fetchOneDog } from '../api/api';
import { IDogsImages } from '../interfaces/interfaces';

export class DogsStore {
  @observable
  dogsPhotos: IDogsImages[] = [];
  oneDog: any = {};
  dogId: number | null = null;

  constructor() {
    makeObservable(this, {
      dogsPhotos: observable,
      oneDog: observable,
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
    fetchOneDog(dogId).then((data) => (this.oneDog = data));
  };

  @action
  setDogId = (id: number) => {
    this.dogId = id;
  };
}
