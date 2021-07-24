//===================================== Definitions pretaining to attractions

export interface ILocation {
  latitude: string;
  longitude: string;
}

export interface ICreateAttraction {
  location: ILocation;
  name: string;
  guides: string[];
  avatar: string;
  images: string[];
}

export interface ICreateAttractionRaw {
  ID: string;
  createdAt: string;
  updatedAt: string;
  location: ILocation;
  name: string;
  guides: string[];
  avatar: string;
  images: string[];
}
//=====================================
