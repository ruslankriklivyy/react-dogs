import axios from 'axios';
import { IBreeds, IDogsImages } from '../interfaces/interfaces';

const instance = axios.create({
  baseURL: 'https://api.thedogapi.com/v1/',
  headers: {
    'x-api-key': 'eed27326-eb78-4ca5-91ea-b9aa9d983493',
  },
});

export const fetchDogs = (breedId: number | null): Promise<IDogsImages[]> => {
  return instance.get(`images/search?breed_id=${breedId}`).then(({ data }) => data);
};

export const fetchBreeds = (
  breed: string,
  limit: number,
  order: string,
  searchQuery: string,
  currentPage: number,
): Promise<IBreeds[]> => {
  return instance
    .get(
      `breeds${breed === 'All breeds' && searchQuery !== '' ? `/search?q=${searchQuery}` : ''}${
        breed !== 'All breeds'
          ? `/search?q=${breed}`
          : `${searchQuery !== '' ? '&' : '?'}order=${order.toUpperCase()}`
      }${breed !== 'All breeds' ? '' : `&limit=${limit}`}&page=${currentPage}`,
    )
    .then(({ data }) => data);
};

export const fetchSortBreeds = (): Promise<IBreeds[]> => {
  return instance.get(`breeds?limit=10`).then(({ data }) => data);
};

export const fetchOneDog = (dogId: number | null) => {
  return instance.get(`images/search?breed_id=${dogId}`).then(({ data }) => data);
};

export const fetchGalleryFromApi = () => {
  return instance.get(`images/search?limit=10`).then(({ data }) => {
    console.log(data);
    return data;
  });
};
