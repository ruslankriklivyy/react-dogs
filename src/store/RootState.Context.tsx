import React from 'react';
import { DogsStore } from './DogsStore';

interface RootStateContextValue {
  dogsStore: DogsStore;
}

const RootStateContext = React.createContext<RootStateContextValue>({} as RootStateContextValue);

const dogsStore = new DogsStore();

export const RootStateProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => (
  <RootStateContext.Provider value={{ dogsStore }}>{children}</RootStateContext.Provider>
);

export const useRootStore = () => React.useContext(RootStateContext);
