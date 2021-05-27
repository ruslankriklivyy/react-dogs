import { observer } from 'mobx-react-lite';
import React from 'react';

import downArrowSvg from '../../assets/img/down-arrow.svg';
import { useRootStore } from '../../store/RootState.Context';

interface IGalleryOrder {
  sortBy: string;
}

const orderArr = ['Random', 'Desc', 'Asc'];
const typeArr = ['Random', 'Gif', 'Image'];

const GalleryOrder: React.FC<IGalleryOrder> = observer(({ sortBy }) => {
  const { filterStore, galleryStore } = useRootStore();
  const [visibleOrderList, setVisibleOrderList] = React.useState(false);
  const popupRef = React.useRef<HTMLDivElement>(null);

  const onCloseVisibleOrderList = React.useCallback(() => {
    setVisibleOrderList(false);
  }, []);

  const onSelectOrder = (order: string) => {
    galleryStore.setGalleryOrder(order);
    onCloseVisibleOrderList();
  };

  const onSelectType = (type: string) => {
    galleryStore.setGalleryType(type);
    onCloseVisibleOrderList();
  };

  const onSelectBreed = (breed: string, id: number | null) => {
    galleryStore.setGalleryBreed(breed);
    galleryStore.setCurrentBreedId(id);
    onCloseVisibleOrderList();
  };

  const escapeListener = React.useCallback(
    (e) => {
      if (e.key === 'Escape') {
        onCloseVisibleOrderList();
      }
    },
    [onCloseVisibleOrderList],
  );
  const clickListener = React.useCallback(
    (e) => {
      const path = e.path || (e.composedPath && e.composedPath());
      if (!path.includes(popupRef.current)) {
        onCloseVisibleOrderList();
      }
    },
    [onCloseVisibleOrderList],
  );
  React.useEffect(() => {
    document.addEventListener('click', clickListener);
    document.addEventListener('keyup', escapeListener);
    return () => {
      document.removeEventListener('click', clickListener);
      document.removeEventListener('keyup', escapeListener);
    };
  }, [clickListener, escapeListener]);

  React.useEffect(() => {
    filterStore.fetchSortBreeds();
  }, [filterStore]);

  return (
    <div className="gallery-sort__item" ref={popupRef}>
      {sortBy === 'Order' && visibleOrderList && (
        <div className="sortby-popup sortby-popup--gallery">
          {orderArr.map((item) => (
            <button key={item} onClick={() => onSelectOrder(item)}>
              {item}
            </button>
          ))}
        </div>
      )}
      {sortBy === 'Type' && visibleOrderList && (
        <div className="sortby-popup sortby-popup--gallery">
          {typeArr.map((item) => (
            <button key={item} onClick={() => onSelectType(item)}>
              {item}
            </button>
          ))}
        </div>
      )}
      {sortBy === 'Breed' && visibleOrderList && (
        <div className="sortby-popup sortby-popup--gallery">
          <button onClick={() => onSelectBreed('Random', null)}>Random</button>
          {filterStore.sortBreeds.map((item) => (
            <button key={item.id} onClick={() => onSelectBreed(item.name, item.id)}>
              {item.name}
            </button>
          ))}
        </div>
      )}
      <h4 className="gallery-sort__type">{sortBy}</h4>
      <button
        className="gallery-sort__button"
        onClick={() => setVisibleOrderList(!visibleOrderList)}>
        {sortBy === 'Order' && <span>{galleryStore.order}</span>}
        {sortBy === 'Type' && <span>{galleryStore.type}</span>}
        {sortBy === 'Breed' && <span>{galleryStore.currentBreed}</span>}
        <img src={downArrowSvg} alt="down arrow svg" />
      </button>
    </div>
  );
});

export default GalleryOrder;
