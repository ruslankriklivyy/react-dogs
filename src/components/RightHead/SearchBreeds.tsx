import React from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { observer } from 'mobx-react-lite';
import { useHistory } from 'react-router';

import { useRootStore } from '../../store/RootState.Context';
import searchSvg from '../../assets/img/search.svg';

export const SearchBreeds = observer(() => {
  const [inputValue, setInputValue] = React.useState('');
  const { filterStore } = useRootStore();
  const history = useHistory();

  if (inputValue) {
    history.push('/breeds');
  }

  const onHandleSearchValue = useDebouncedCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      filterStore.setSearchQuery(inputValue);
    }
  }, 60);

  const onSendInputValue = () => {
    filterStore.setSearchQuery(inputValue);
  };

  return (
    <div className="breeds__search">
      <input
        type="text"
        placeholder="Search for breeds by name"
        value={inputValue}
        onKeyDown={(e) => onHandleSearchValue(e)}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={onSendInputValue}>
        <img src={searchSvg} alt="search svg" />
      </button>
    </div>
  );
});
