import React from 'react';
import { observer } from 'mobx-react-lite';

import { useRootStore } from '../../store/RootState.Context';

import downArrowSvg from '../../assets/img/down-arrow.svg';

const numArr = [5, 10, 15, 20];

const SortByLimit = observer(() => {
  const { galleryStore } = useRootStore();
  const [visibleLimit, setVisibleLimit] = React.useState(false);
  const popupRef = React.useRef<HTMLDivElement>(null);

  const onSelectLimitBreeds = (limit: number) => {
    galleryStore.setGalleryLimit(limit);
    onCloseLimit();
  };

  const onCloseLimit = React.useCallback(() => {
    setVisibleLimit(false);
  }, []);

  const escapeListener = React.useCallback(
    (e) => {
      if (e.key === 'Escape') {
        onCloseLimit();
      }
    },
    [onCloseLimit],
  );
  const clickListener = React.useCallback(
    (e) => {
      const path = e.path || (e.composedPath && e.composedPath());
      if (!path.includes(popupRef.current)) {
        onCloseLimit();
      }
    },
    [onCloseLimit],
  );
  React.useEffect(() => {
    document.addEventListener('click', clickListener);
    document.addEventListener('keyup', escapeListener);
    return () => {
      document.removeEventListener('click', clickListener);
      document.removeEventListener('keyup', escapeListener);
    };
  }, [clickListener, escapeListener]);

  return (
    <div className="gallery-sort__item gallery-sort__item--limit" ref={popupRef}>
      {visibleLimit && (
        <div className="sortby-popup sortby-popup--gallery sortby-popup--limit">
          {numArr.map((item) => (
            <button key={item} onClick={() => onSelectLimitBreeds(item)}>
              {item}
            </button>
          ))}
        </div>
      )}
      <h4 className="gallery-sort__type">Limit</h4>
      <button className="gallery-sort__button" onClick={() => setVisibleLimit(!visibleLimit)}>
        <span>{galleryStore.limit} items per page</span>
        <img src={downArrowSvg} alt="down arrow svg" />
      </button>
    </div>
  );
});

export default SortByLimit;
