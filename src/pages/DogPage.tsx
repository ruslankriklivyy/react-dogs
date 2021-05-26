import { observer } from 'mobx-react-lite';
import React from 'react';
import { useRootStore } from '../store/RootState.Context';

const DogPage = observer(() => {
  const { dogsStore } = useRootStore();

  React.useEffect(() => {
    dogsStore.fetchOneDog(dogsStore.dogId);
  }, [dogsStore, dogsStore.dogId]);

  return <div>12{console.log(dogsStore.oneDog[0]?.id)}</div>;
});

export default DogPage;
