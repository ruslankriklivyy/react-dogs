import axios from 'axios';
import { IBreeds, IDogsImages, IFavoritesImages } from '../interfaces/interfaces';

const instance = axios.create({
  baseURL: 'https://api.thedogapi.com/v1/',
  headers: {
    'x-api-key': 'eed27326-eb78-4ca5-91ea-b9aa9d983493',
  },
});

export const fetchDogsFromApi = (breedId: number | null): Promise<IDogsImages[]> => {
  return instance
    .get(`images/search?breed_id=${breedId}`)
    .then(({ data }) => data)
    .catch((err) => alert(err));
};

export const fetchBreedsFromApi = (
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
    .then(({ data }) => data)
    .catch((err) => alert(err));
};

export const fetchSortBreedsFromApi = (): Promise<IBreeds[]> => {
  return instance
    .get(`breeds?limit=10`)
    .then(({ data }) => data)
    .catch((err) => alert(err));
};

export const fetchOneDogFromApi = (dogId: number | null): Promise<IDogsImages[]> => {
  return instance
    .get(`images/search?breed_id=${dogId}`)
    .then(({ data }) => data)
    .catch((err) => alert(err));
};

export const fetchGalleryFromApi = (
  order: string,
  limit: number,
  type: string,
  currentBreedId: number | null,
  currentPage: number,
): Promise<IDogsImages[]> => {
  return instance
    .get(
      `images/search?limit=${limit}${type !== 'Random' ? `&mime_types=${type}` : ''}${
        order !== 'Random' ? `&order=${order}` : ''
      }${currentBreedId ? `&breed_id=${currentBreedId}` : ''}&page=${currentPage}`,
    )
    .then(({ data }) => data)
    .catch((err) => alert(err));
};

export const sendDogImageFromApi = (image: any) => {
  return instance
    .post('images/upload', {
      file: image,
      sub_id: 'ruslanK22',
    })
    .then(({ data }) => data)
    .catch((err) => alert(err));
};

export const addToFavoritesFromApi = (imageId: string) => {
  return instance
    .post('favourites', {
      image_id: imageId,
      sub_id: 'ruslanK22',
    })
    .catch((err) => alert(err));
};

export const fetchFavoritesImagesFromApi = (
  limit: number | undefined,
): Promise<IFavoritesImages[]> => {
  return instance
    .get(`favourites?sub_id=ruslanK22${limit !== undefined ? `&limit=${limit}` : ''}`)
    .then(({ data }) => data)
    .catch((err) => alert(err));
};

export const removeFavoriteImageFromApi = (imageId: string) => {
  return instance
    .delete(`favourites/${imageId}`)
    .then(({ data }) => data)
    .catch((err) => alert(err));
};

export const fetchCurrentVoteImageFromApi = (currentPage: number): Promise<IDogsImages[]> => {
  return instance
    .get(`images/search?page=${currentPage}`)
    .then(({ data }) => data)
    .catch((err) => alert(err));
};
