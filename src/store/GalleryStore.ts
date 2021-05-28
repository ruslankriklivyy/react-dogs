import { observable, action, makeObservable } from 'mobx';
import {
  addToFavorites,
  fetchFavoritesImages,
  fetchGalleryFromApi,
  sendDogImage,
} from '../api/api';
import { IDogsImages } from '../interfaces/interfaces';

export class GalleryStore {
  gallery: IDogsImages[] = [];
  currentBreed: string = 'Random';
  favoritesImages: any = [];
  currentBreedId: number | null = null;
  order: string = 'Random';
  type: string = 'Random';
  limit: number = 5;
  isFetching: boolean = false;
  currentPage: number = 0;

  constructor() {
    makeObservable(this, {
      gallery: observable,
      isFetching: observable,
      currentBreed: observable,
      type: observable,
      order: observable,
      currentBreedId: observable,
      currentPage: observable,
      favoritesImages: observable,
      fetchGallery: action,
      setGalleryOrder: action,
      setGalleryType: action,
      setGalleryBreed: action,
      setGalleryLimit: action,
      setCurrentBreedId: action,
      setCurrentPage: action,
      sendImage: action,
      getFavoritesImage: action,
    });
  }

  @action
  fetchGallery = (
    order: string,
    limit: number,
    type: string,
    currentBreedId: number | null,
    currentPage: number,
  ) => {
    this.isFetching = false;
    fetchGalleryFromApi(order, limit, type, currentBreedId, currentPage)
      .then((data) => (this.gallery = data))
      .finally(() => (this.isFetching = true));
  };

  @action
  setGalleryOrder = (orderName: string) => {
    this.order = orderName;
  };

  @action
  setGalleryType = (typeName: string) => {
    this.type = typeName;
  };

  @action
  setGalleryBreed = (currentBreed: string) => {
    this.currentBreed = currentBreed;
  };

  @action
  setGalleryLimit = (limit: number) => {
    this.limit = limit;
  };

  @action
  setCurrentBreedId = (currentBreedId: number | null) => {
    this.currentBreedId = currentBreedId;
  };

  @action
  setCurrentPage = (currentPage: number) => {
    this.currentPage = currentPage;
  };

  @action
  sendImage = (image: any) => {
    sendDogImage(image);
  };

  @action
  addImageToFavorites = (imageId: string) => {
    addToFavorites(imageId);
  };

  @action
  getFavoritesImage = () => {
    this.isFetching = false;
    fetchFavoritesImages()
      .then((data) => (this.favoritesImages = data))
      .finally(() => (this.isFetching = true));
  };
}
