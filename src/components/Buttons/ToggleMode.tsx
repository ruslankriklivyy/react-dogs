import React from 'react';
import classNames from 'classnames';
import { observer } from 'mobx-react-lite';

import { useRootStore } from '../../store/RootState.Context';

import eyeSvg from '../../assets/img/eye.svg';
import closeEyeSvg from '../../assets/img/close-eye.svg';

export const ToggleMode = observer(() => {
  const { dogsStore } = useRootStore();

  const onSetMode = () => {
    dogsStore.setDarkMode(!dogsStore.isDarkMode);

    dogsStore.isDarkMode
      ? document.querySelector<HTMLElement>('body')?.classList.add('dark')
      : document.querySelector<HTMLElement>('body')?.classList.remove('dark');
  };

  return (
    <div className="toggle-mode">
      <div
        className={classNames({
          'toggle-mode-icon': !dogsStore.isDarkMode,
          'toggle-mode-icon dark': dogsStore.isDarkMode,
        })}>
        {!dogsStore.isDarkMode ? (
          <img src={eyeSvg} alt="eye svg" />
        ) : (
          <img src={closeEyeSvg} alt="close eye svg" />
        )}
      </div>
      <button
        className={classNames({
          'toggle-mode__btn': !dogsStore.isDarkMode,
          'toggle-mode__btn dark': dogsStore.isDarkMode,
        })}
        onClick={() => onSetMode()}>
        <span></span>
      </button>
    </div>
  );
});
