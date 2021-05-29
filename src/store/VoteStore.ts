import { observable, action, makeAutoObservable } from 'mobx';
import { fetchCurrentVoteImageApi } from '../api/api';

export class VoteStore {
  @observable
  currentVoteImage: any = [];
  currentPage: number = 0;
  isFetching: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  @action
  getCurrentVoteImage = (currentPage: number) => {
    this.isFetching = false;
    fetchCurrentVoteImageApi(currentPage)
      .then((data) => (this.currentVoteImage = data))
      .finally(() => (this.isFetching = true));
  };

  @action
  setCurrentPage = (currentPage: number) => {
    this.currentPage = currentPage;
  };
}
