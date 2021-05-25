import axios from 'axios';
import { IDogsImages } from '../interfaces/interfaces';

const instance = axios.create({
  baseURL: 'https://api.thedogapi.com/v1/',
  headers: {
    'x-api-key': 'eed27326-eb78-4ca5-91ea-b9aa9d983493',
  },
});

export const fetchDogs = (): Promise<IDogsImages[]> => {
  return instance.get('images/search?limit=10').then(({ data }) => {
    console.log(data);
    return data;
  });
};
