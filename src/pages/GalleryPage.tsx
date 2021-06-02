import React from 'react';
import { useDropzone } from 'react-dropzone';
import {
  BackBtn,
  Button,
  GalleryOrder,
  Paginate,
  Preloader,
  SortByLimit,
  TopSort,
} from '../components';

import reloadSvg from '../assets/img/reload.svg';
import { useRootStore } from '../store/RootState.Context';
import { observer } from 'mobx-react-lite';

import closeSvg from '../assets/img/close.svg';

const galleryOrder = [
  { id: 1, by: 'Order' },
  { id: 2, by: 'Type' },
  { id: 3, by: 'Breed' },
];

interface IFile {
  preview: string;
}

const GalleryPage = observer(() => {
  const [files, setFiles]: any = React.useState([]);
  const { galleryStore } = useRootStore();
  const [visibleUploadImage, setVisibleUploadImage] = React.useState(false);

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        ),
      );
    },
  });

  const onCloseUploadImage = () => {
    setVisibleUploadImage(false);
    setFiles([]);
  };

  const onSendImage = () => {
    galleryStore.sendImage(files[0]);
    setFiles([]);
  };

  const onSend = () => {
    galleryStore.fetchGallery(
      galleryStore.order,
      galleryStore.limit,
      galleryStore.type,
      galleryStore.currentBreedId,
      galleryStore.currentPage,
    );
  };

  React.useEffect(() => {
    galleryStore.fetchGallery(
      galleryStore.order,
      galleryStore.limit,
      galleryStore.type,
      galleryStore.currentBreedId,
      galleryStore.currentPage,
    );
  }, [galleryStore, galleryStore.currentPage]);

  React.useEffect(
    () => () => {
      files.forEach((file: IFile) => URL.revokeObjectURL(file.preview));
    },
    [files],
  );

  return (
    <div className="gallery">
      {!visibleUploadImage ? (
        <>
          <TopSort />
          <div className="box-white">
            <div className="breeds-top">
              <BackBtn />
              <Button>Gallery</Button>
              <Button className="btn btn--upload" onClick={() => setVisibleUploadImage(true)}>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7.86601 0L12.2355 4.03339L11.4129 4.92452L8.48919 2.22567V12.3618H7.27645V2.30464L4.67336 4.90772L3.81583 4.05019L7.86601 0ZM1.21274 14.7873V7.51081H0V16H15.7656V7.51081H14.5529V14.7873H1.21274Z"
                    fill="#FF868E"
                  />
                </svg>
                Upload
              </Button>
            </div>
            <div className="gallery-sort">
              {galleryOrder.map((item) => (
                <GalleryOrder key={item.id} sortBy={item.by} />
              ))}
              <div className="gallery-sort__item-wrapper">
                <SortByLimit />
                <button className="reload" onClick={() => onSend()}>
                  <img src={reloadSvg} alt="reload svg" />
                </button>
              </div>
            </div>
            <div>
              {galleryStore.isFetching ? (
                <>
                  <div className={`breeds-dogs breeds-dogs--${galleryStore.limit}`}>
                    {galleryStore.gallery.map((item, index) => (
                      <div
                        key={item.id}
                        className={`breeds-dogs__item breeds-dogs__item--${index + 1}`}>
                        <div className="breeds-dogs__box">
                          <div className="breeds-dogs__blockout">
                            <button onClick={() => galleryStore.addImageToFavorites(item.id)}>
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
                          <img src={item.url} alt="dog jpg" />
                        </div>
                      </div>
                    ))}
                  </div>
                  <Paginate
                    setCurrentPage={galleryStore.setCurrentPage}
                    currentPage={galleryStore.currentPage}
                  />
                </>
              ) : (
                <Preloader />
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="upload-box">
          <div className="box-white">
            <button className="upload-close" onClick={() => onCloseUploadImage()}>
              <img src={closeSvg} alt="close svg" />
            </button>
            <h2 className="upload-title">Upload a .jpg or .png Dog Image</h2>
            <p className="upload-text">
              Any uploads must comply with the upload guidelines or face deletion.
            </p>
            <div className="upload-block">
              {files.length ? (
                <div className="upload-preview">
                  <img src={files[0]?.preview} alt="" />
                </div>
              ) : (
                <div {...getRootProps({ className: 'dropzone' })}>
                  <input {...getInputProps()} />
                  <div className="upload-action">
                    <span>
                      <strong>Drag here</strong> your file or <strong>Click here</strong> to upload
                    </span>
                  </div>
                </div>
              )}
            </div>
            <div className="upload-noselected">
              {files.length ? <span>{files[0]?.path}</span> : <span>No file selected</span>}
            </div>
            <Button onClick={() => onSendImage()}>Upload Photo</Button>
          </div>
        </div>
      )}
    </div>
  );
});

export default GalleryPage;
