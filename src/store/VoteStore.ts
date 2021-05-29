import { observable, action, makeAutoObservable } from 'mobx';
import { fetchCurrentVoteImageFromApi } from '../api/api';
import { IDogsImages } from '../interfaces/interfaces';

export class VoteStore {
  @observable
  currentVoteImage: IDogsImages[] = [];
  currentPage: number = 0;
  isFetching: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  @action
  getCurrentVoteImage = (currentPage: number) => {
    this.isFetching = false;
    fetchCurrentVoteImageFromApi(currentPage)
      .then((data) => (this.currentVoteImage = data))
      .finally(() => (this.isFetching = true));
  };

  @action
  setCurrentPage = (currentPage: number) => {
    this.currentPage = currentPage;
  };
}
