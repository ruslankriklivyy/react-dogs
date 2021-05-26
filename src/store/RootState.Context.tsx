import React from 'react';
import { DogsStore } from './DogsStore';
import { FilterStore } from './FilterStore';

interface RootStateContextValue {
  dogsStore: DogsStore;
  filterStore: FilterStore;
}

const RootStateContext = React.createContext<RootStateContextValue>({} as RootStateContextValue);

const dogsStore = new DogsStore();
const filterStore = new FilterStore();

export const RootStateProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => (
  <RootStateContext.Provider value={{ dogsStore, filterStore }}>
    {children}
  </RootStateContext.Provider>
);

export const useRootStore = () => React.useContext(RootStateContext);
