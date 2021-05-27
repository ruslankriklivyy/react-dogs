import React from 'react';
import { BackBtn, Button, Paginate, Prelaoder, TopSort } from '../components';

import downArrowSvg from '../assets/img/down-arrow.svg';
import reloadSvg from '../assets/img/reload.svg';
import { useRootStore } from '../store/RootState.Context';
import { observer } from 'mobx-react-lite';

import heartSvg from '../assets/img/heart.svg';

const GalleryPage = observer(() => {
  const { galleryStore } = useRootStore();

  React.useEffect(() => {
    galleryStore.fetchGallery();
  }, [galleryStore]);

  return (
    <div className="gallery">
      <TopSort />
      <div className="box-white">
        <div className="breeds-top">
          <BackBtn />
          <Button>Gallery</Button>
          <Button className="btn btn--upload">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M7.86601 0L12.2355 4.03339L11.4129 4.92452L8.48919 2.22567V12.3618H7.27645V2.30464L4.67336 4.90772L3.81583 4.05019L7.86601 0ZM1.21274 14.7873V7.51081H0V16H15.7656V7.51081H14.5529V14.7873H1.21274Z"
                fill="#FF868E"
              />
            </svg>
            Upload
          </Button>
        </div>
        <div className="gallery-sort">
          <div className="gallery-sort__item">
            <h4 className="gallery-sort__type">Order</h4>
            <button className="gallery-sort__button">
              <span>Random</span>
              <img src={downArrowSvg} alt="down arrow svg" />
            </button>
          </div>
          <div className="gallery-sort__item">
            <h4 className="gallery-sort__type">Type</h4>
            <button className="gallery-sort__button">
              <span>Static</span>
              <img src={downArrowSvg} alt="down arrow svg" />
            </button>
          </div>
          <div className="gallery-sort__item">
            <h4 className="gallery-sort__type">Breed</h4>
            <button className="gallery-sort__button">
              <span>None</span>
              <img src={downArrowSvg} alt="down arrow svg" />
            </button>
          </div>
          <div className="gallery-sort__item-wrapper">
            <div className="gallery-sort__item gallery-sort__item--limit">
              <h4 className="gallery-sort__type">Limit</h4>
              <button className="gallery-sort__button">
                <span>5 items per page</span>
                <img src={downArrowSvg} alt="down arrow svg" />
              </button>
            </div>
            <button className="reload">
              <img src={reloadSvg} alt="reload svg" />
            </button>
          </div>
        </div>
        <div>
          {galleryStore.isFetching ? (
            <>
              <div className={`breeds-dogs breeds-dogs--${10}`}>
                {galleryStore.gallery.map((item, index) => (
                  <div className={`breeds-dogs__item breeds-dogs__item--${index + 1}`}>
                    <div className="breeds-dogs__box">
                      <div className="breeds-dogs__blockout">
                        <button>
                          <img src={heartSvg} alt="heart svg" />
                        </button>
                      </div>
                      <img src={item.url} alt="dog jpg" />
                    </div>
                  </div>
                ))}
              </div>
              <Paginate />
            </>
          ) : (
            <Prelaoder />
          )}
        </div>
      </div>
    </div>
  );
});

export default GalleryPage;
