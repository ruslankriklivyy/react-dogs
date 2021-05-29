import { action, makeAutoObservable, observable } from 'mobx';
import {
  addToFavoritesFromApi,
  fetchFavoritesImagesFromApi,
  fetchGalleryFromApi,
  removeFavoriteImageFromApi,
  sendDogImageFromApi,
} from '../api/api';
import { IDogsImages, IFavoritesImages } from '../interfaces/interfaces';

export class GalleryStore {
  @observable
  gallery: IDogsImages[] = [];
  currentBreed: string = 'Random';
  favoritesImages: IFavoritesImages[] = [];
  currentBreedId: number | null = null;
  order: string = 'Random';
  type: string = 'Random';
  limit: number = 5;
  isFetching: boolean = false;
  currentPage: number = 0;

  constructor() {
    makeAutoObservable(this);
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
    sendDogImageFromApi(image);
  };

  @action
  addImageToFavorites = (imageId: string) => {
    addToFavoritesFromApi(imageId);
  };

  @action
  getFavoritesImage = () => {
    this.isFetching = false;
    fetchFavoritesImagesFromApi()
      .then((data) => (this.favoritesImages = data))
      .finally(() => (this.isFetching = true));
  };

  @action
  removeFavoriteImage = (imageId: string) => {
    removeFavoriteImageFromApi(imageId);
  };
}
