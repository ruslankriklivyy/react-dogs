import { observable, action, makeObservable } from 'mobx';
import { fetchBreeds, fetchSortBreeds } from '../api/api';
import { IBreeds } from '../interfaces/interfaces';

export class FilterStore {
  @observable
  breeds: IBreeds[] = [];
  sortBreeds: IBreeds[] = [];
  currentBreed: string = 'All breeds';
  breedId: number | null = null;
  limitBreeds: number = 10;
  orderType: string = 'asc';
  searchQuery: string = '';
  isFetching: boolean = false;
  currentPage: number = 0;

  constructor() {
    makeObservable(this, {
      breeds: observable,
      currentBreed: observable,
      sortBreeds: observable,
      isFetching: observable,
      limitBreeds: observable,
      orderType: observable,
      searchQuery: observable,
      currentPage: observable,
      fetchBreedsList: action,
      setCurrentBreed: action,
      setBreedId: action,
      fetchSortBreeds: action,
      setLimitBreeds: action,
      setOrderType: action,
      setSearchQuery: action,
      setCurrentPage: action,
    });
  }

  @action
  fetchBreedsList = (
    breed: string,
    limit: number,
    order: string,
    searchQuery: string,
    currentPage: number,
  ) => {
    this.isFetching = false;
    fetchBreeds(breed, limit, order, searchQuery, currentPage)
      .then((data) => (this.breeds = data))
      .finally(() => (this.isFetching = true));
  };

  @action
  setCurrentBreed = (currentBreed: string) => {
    this.currentBreed = currentBreed;
  };

  @action
  setBreedId = (breedId: number) => {
    this.breedId = breedId;
  };

  @action
  fetchSortBreeds = () => {
    fetchSortBreeds().then((data) => (this.sortBreeds = data));
  };

  @action
  setLimitBreeds = (limitBreeds: number) => {
    this.limitBreeds = limitBreeds;
  };

  @action
  setOrderType = (order: string) => {
    this.orderType = order;
  };

  @action
  setSearchQuery = (search: string) => {
    this.searchQuery = search;
  };

  @action
  setCurrentPage = (currentPage: number) => {
    this.currentPage = currentPage;
  };
}
