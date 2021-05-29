import { createContext } from 'react';
import { DogsStore } from './DogsStore';
import { FilterStore } from './FilterStore';
import { GalleryStore } from './GalleryStore';
import { VoteStore } from './VoteStore';

export const rootStoreContext = createContext({
  DogsStore: new DogsStore(),
  FilterStore: new FilterStore(),
  GalleryStore: new GalleryStore(),
  VoteStore: new VoteStore(),
});
