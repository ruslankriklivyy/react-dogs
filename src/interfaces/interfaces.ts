export interface IBreedsSizes {
  imperial: string;
  metric: string;
}

export interface IBreedsItems {
  bred_for: string;
  breed_group: string;
  height: IBreedsSizes;
  id: number;
  life_span: string;
  name: string;
  reference_image_id: string;
  temperament: string;
  weight: IBreedsSizes;
}

export interface IBreedsImage {
  id: string;
  width: number;
  height: number;
  url: string;
}

export interface IBreeds extends IBreedsItems {
  image: IBreedsImage;
  origin: string;
}

export interface IDogsImages {
  breeds: IBreedsItems[];
  height: number;
  id: string;
  url: string;
  width: number;
}

export interface IFavoritesImage {
  id: string;
  url: string;
}

export interface IFavoritesImages {
  id: string;
  user_id: string;
  image_id: string;
  sub_id: string;
  created_at: string;
  image: IFavoritesImage;
}
