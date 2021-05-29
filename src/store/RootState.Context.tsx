import React from 'react';
import { DogsStore } from './DogsStore';
import { FilterStore } from './FilterStore';
import { GalleryStore } from './GalleryStore';
import { VoteStore } from './VoteStore';

interface RootStateContextValue {
  dogsStore: DogsStore;
  filterStore: FilterStore;
  galleryStore: GalleryStore;
  voteStore: VoteStore;
}

const RootStateContext = React.createContext<RootStateContextValue>({} as RootStateContextValue);

const dogsStore = new DogsStore();
const filterStore = new FilterStore();
const galleryStore = new GalleryStore();
const voteStore = new VoteStore();

export const RootStateProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => (
  <RootStateContext.Provider value={{ dogsStore, filterStore, galleryStore, voteStore }}>
    {children}
  </RootStateContext.Provider>
);

export const useRootStore = () => React.useContext(RootStateContext);
