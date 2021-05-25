import { createContext } from 'react';
import { DogsStore } from './DogsStore';

export const rootStoreContext = createContext({
  DogsStore: new DogsStore(),
});
