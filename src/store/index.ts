import { createContext } from 'react';
import { DogsStore } from './DogsStore';
import { FilterStore } from './FilterStore';

export const rootStoreContext = createContext({
  DogsStore: new DogsStore(),
  FilterStore: new FilterStore(),
});
