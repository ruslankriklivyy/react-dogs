import { observable, action, makeObservable } from 'mobx';
import { fetchDogs } from '../api/api';
import { IDogsImages } from '../interfaces/interfaces';

export class DogsStore {
  @observable
  dogsPhotos: IDogsImages[] = [];

  constructor() {
    makeObservable(this, {
      dogsPhotos: observable,
      fetchDogsPhotos: action,
    });
  }

  @action
  fetchDogsPhotos = () => {
    fetchDogs().then((data) => (this.dogsPhotos = data));
  };
}
