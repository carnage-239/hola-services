//===================================== Definitions pretaining to attractions

export interface ILocation {
  latitude: number;
  longitude: number;
}

export interface ICreateAttraction {
  location: ILocation;
  areaOfOperation: string;
  name: string;
  guides: string[];
  avatar: string;
  images: string[];
}

export interface ICreateAttractionRaw extends ICreateAttraction {
  ID: string;
  createdAt: string;
  updatedAt: string;
}
//=====================================

export interface IQuerySchema {
  coordinates: ILocation;
  radius: number;
}

export interface IAddGuideToAttraction {
  locationID: string;
  guides: string[];
}

export interface IAreaOfOperations {
  aop: string[];
}
