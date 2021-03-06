import React from 'react';
import { IBreeds } from '../../interfaces/interfaces';

const numArr = [5, 10, 15, 20];

interface IBreedsOrder {
  items?: IBreeds[];
  onSelectCurrentBreed?: (name: string, id: number) => void;
  currentBreed?: string;
  setCurrentBreed?: (currentBreed: string) => void;
  type?: string;
  limit?: boolean;
  limitBreeds?: number;
  onSelectLimitBreeds?: (limit: number) => void;
}

export const BreedsOrder: React.FC<IBreedsOrder> = ({
  items,
  onSelectCurrentBreed,
  currentBreed,
  setCurrentBreed,
  type,
  limit,
  limitBreeds,
  onSelectLimitBreeds,
}) => {
  const [visibleBreeds, setVisibleBreeds] = React.useState(false);
  const popupRef = React.useRef<HTMLDivElement>(null);

  const onCloseBreeds = React.useCallback(() => {
    setVisibleBreeds(false);
  }, []);

  const toggleVisibleBreeds = () => {
    setVisibleBreeds(!visibleBreeds);
  };

  const escapeListener = React.useCallback(
    (e) => {
      if (e.key === 'Escape') {
        onCloseBreeds();
      }
    },
    [onCloseBreeds],
  );
  const clickListener = React.useCallback(
    (e) => {
      const path = e.path || (e.composedPath && e.composedPath());
      if (!path.includes(popupRef.current)) {
        onCloseBreeds();
      }
    },
    [onCloseBreeds],
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
    <>
      {!limit ? (
        <div className="sortby-breeds" onClick={() => toggleVisibleBreeds()} ref={popupRef}>
          {visibleBreeds && (
            <div className="sortby-popup">
              <button onClick={() => setCurrentBreed && setCurrentBreed('All breeds')}>
                {type}
              </button>
              {items?.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onSelectCurrentBreed && onSelectCurrentBreed(item.name, item.id)}>
                  {item.name}
                </button>
              ))}
            </div>
          )}
          <span>{currentBreed}</span>
          <svg
            width="12"
            height="8"
            viewBox="0 0 12 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M6.59406 7.17405L11.7538 2.01423C12.0821 1.68603 12.0821 1.15383 11.7538 0.825753C11.4256 0.497673 10.8935 0.497673 10.5655 0.825753L5.99993 5.39142L1.43458 0.825933C1.10635 0.497793 0.574264 0.497793 0.24617 0.825933C-0.0820567 1.15401 -0.0820567 1.68615 0.24617 2.01435L5.40591 7.17418C5.57003 7.33824 5.78492 7.42017 5.9999 7.42017C6.21498 7.42017 6.43002 7.33807 6.59406 7.17405Z"
              fill="#8C8C8C"
            />
          </svg>
        </div>
      ) : (
        <div
          className="sortby-limit"
          onClick={() => setVisibleBreeds(!visibleBreeds)}
          ref={popupRef}>
          {visibleBreeds && (
            <div className="sortby-popup">
              {numArr.map((item) => (
                <button key={item} onClick={() => onSelectLimitBreeds && onSelectLimitBreeds(item)}>
                  Limit: {item}
                </button>
              ))}
            </div>
          )}
          <span>Limit: {limitBreeds}</span>
          <svg
            width="12"
            height="8"
            viewBox="0 0 12 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M6.59406 7.17405L11.7538 2.01423C12.0821 1.68603 12.0821 1.15383 11.7538 0.825753C11.4256 0.497673 10.8935 0.497673 10.5655 0.825753L5.99993 5.39142L1.43458 0.825933C1.10635 0.497793 0.574264 0.497793 0.24617 0.825933C-0.0820567 1.15401 -0.0820567 1.68615 0.24617 2.01435L5.40591 7.17418C5.57003 7.33824 5.78492 7.42017 5.9999 7.42017C6.21498 7.42017 6.43002 7.33807 6.59406 7.17405Z"
              fill="#8C8C8C"
            />
          </svg>
        </div>
      )}
    </>
  );
};
