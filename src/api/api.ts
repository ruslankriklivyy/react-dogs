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

export const fetchGalleryFromApi = (
  order: string,
  limit: number,
  type: string,
  currentBreedId: number | null,
  currentPage: number,
) => {
  return instance
    .get(
      `images/search?limit=${limit}${type !== 'Random' ? `&mime_types=${type}` : ''}${
        order !== 'Random' ? `&order=${order}` : ''
      }${currentBreedId ? `&breed_id=${currentBreedId}` : ''}&page=${currentPage}`,
    )
    .then(({ data }) => data);
};

export const sendDogImage = (image: any) => {
  return instance
    .post('images/upload', {
      file: image,
      sub_id: 'ruslanK22',
    })
    .then(({ data }) => data);
};

export const addToFavorites = (imageId: string) => {
  return instance
    .post('favourites', {
      image_id: imageId,
      sub_id: 'ruslanK22',
    })
    .then(({ data }) => data);
};

export const fetchFavoritesImages = () => {
  return instance.get('favourites?sub_id=ruslanK22').then(({ data }) => {
    console.log(data);
    return data;
  });
};
