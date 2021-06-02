import { observer } from 'mobx-react-lite';
import React from 'react';
import {
  BackBtn,
  Button,
  EmptyItems,
  Paginate,
  Preloader,
  TopSort,
  VoteHistory,
} from '../components';
import { useRootStore } from '../store/RootState.Context';

const FavoritesPage = observer(() => {
  const { galleryStore } = useRootStore();

  const removeImageFromFavorites = (imageId: string) => {
    galleryStore.removeFavoriteImage(imageId);
  };

  React.useEffect(() => {
    galleryStore.getFavoritesImage(galleryStore.favoritesCurrentPage);
  }, [galleryStore, galleryStore.favoritesCurrentPage]);

  return (
    <>
      <TopSort />
      <div className="box-white">
        <div className="evaluation-top">
          <BackBtn />
          <Button>Favorites</Button>
        </div>
        <div className="favorites">
          {!galleryStore.favoritesImages.length && galleryStore.isFetching && <EmptyItems />}
          {galleryStore.isFetching ? (
            <>
              <div className={`breeds-dogs breeds-dogs--${galleryStore.favoritesImages.length}`}>
                {galleryStore.favoritesImages.map((item, index) => (
                  <div className={`breeds-dogs__item breeds-dogs__item--${index + 1}`}>
                    <div className="breeds-dogs__box">
                      <div className="breeds-dogs__blockout">
                        <button onClick={() => removeImageFromFavorites(item.id)}>
                          <svg
                            width="30"
                            height="26"
                            viewBox="0 0 30 26"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M8.07107 2C4.71811 2 2 4.71811 2 8.07107C2 9.68122 2.63963 11.2254 3.77817 12.364L15 23.5858L26.2218 12.364C27.3604 11.2254 28 9.68121 28 8.07107C28 4.71811 25.2819 2 21.9289 2C20.3188 2 18.7746 2.63963 17.636 3.77817L15.7071 5.70711C15.3166 6.09763 14.6834 6.09763 14.2929 5.70711L12.364 3.77818C11.2254 2.63963 9.68121 2 8.07107 2ZM0 8.07107C0 3.61354 3.61354 0 8.07107 0C10.2116 0 12.2646 0.850343 13.7782 2.36396L15 3.58579L16.2218 2.36396C17.7354 0.850341 19.7884 0 21.9289 0C26.3865 0 30 3.61354 30 8.07107C30 10.2116 29.1497 12.2646 27.636 13.7782L15.7071 25.7071C15.3166 26.0976 14.6834 26.0976 14.2929 25.7071L2.36396 13.7782C0.850339 12.2646 0 10.2116 0 8.07107Z"
                              fill="#FF868E"
                            />
                          </svg>
                        </button>
                      </div>
                      <img src={item.image.url} alt="dog jpg" />
                    </div>
                  </div>
                ))}
              </div>
              {galleryStore.favoritesImages.length > 5 && (
                <Paginate
                  currentPage={galleryStore.favoritesCurrentPage}
                  setCurrentPage={galleryStore.setFavoritesCurrentPage}
                />
              )}
              <div className="vote-history">
                {galleryStore?.favoritesImages.map((item) => (
                  <VoteHistory time={item.created_at} imageId={item.image_id} />
                ))}
              </div>
            </>
          ) : (
            <Preloader />
          )}
        </div>
      </div>
    </>
  );
});

export default FavoritesPage;
