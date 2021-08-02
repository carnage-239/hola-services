//===================================== Definitions pretaining to attractions

export interface ILocation {
  latitude: number;
  longitude: number;
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

export interface IQuerySchema {
  coordinates: ILocation;
  radius: number;
}

export interface IAddGuideToAttraction {
  name: string;
  coordinates: ILocation;
  guides: string[];
}
