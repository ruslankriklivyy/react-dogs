import { observable, action, makeObservable } from 'mobx';
import { fetchGalleryFromApi } from '../api/api';
import { IDogsImages } from '../interfaces/interfaces';

export class GalleryStore {
  gallery: IDogsImages[] = [];
  isFetching: boolean = false;

  constructor() {
    makeObservable(this, {
      gallery: observable,
      isFetching: observable,
      fetchGallery: action,
    });
  }

  @action
  fetchGallery = () => {
    this.isFetching = false;
    fetchGalleryFromApi()
      .then((data) => (this.gallery = data))
      .finally(() => (this.isFetching = true));
  };
}
