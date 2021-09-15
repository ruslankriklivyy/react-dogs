import React from 'react';
import { Link } from 'react-router-dom';

import emptyImagePng from '../../assets/img/empty-image.png';
import { IBreedsImage, IDogsImages } from '../../interfaces/interfaces';

interface IBreedItem {
  onSelectDog: (id: number) => void;
  image: IBreedsImage;
  dogsPhotos: IDogsImages[];
  name: string;
  id: number;
}

const BreedItem: React.FC<IBreedItem> = ({ onSelectDog, image, name, id, dogsPhotos }) => {
  return (
    <Link to="/breeds/dog" className="breeds-dogs__item" onClick={() => onSelectDog(id)}>
      <div className="breeds-dogs__box">
        <div className="breeds-dogs__blockout">
          <span>{name}</span>
        </div>
        <img src={image?.url || dogsPhotos[0]?.url || emptyImagePng} alt="dog jpg" />
      </div>
    </Link>
  );
};

export default React.memo(BreedItem);
