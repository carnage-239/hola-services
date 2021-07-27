import {
  ICreateAttraction,
  ICreateAttractionRaw,
  ILocation,
  IQuerySchema
} from 'interfaces';
import { v4 as uuidv4 } from 'uuid';

import dbInstance from '../../../common/libs/database';
import { TABLE_NAME_ATTRACTIONS } from '../config';

export const registerTouristLocation = async (
  data: ICreateAttraction
): Promise<ICreateAttractionRaw | false> => {
  const insertion: ICreateAttractionRaw = {
    ID: 'attraction-' + uuidv4(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...data
  };

  const params = {
    TableName: TABLE_NAME_ATTRACTIONS,
    Item: insertion
  };

  try {
    await dbInstance.put(params);
    return insertion as ICreateAttractionRaw;
  } catch (err) {
    console.log(err.message);
    return false;
  }
};

export const getNearbyLocations = async (
  body: IQuerySchema
): Promise<false | null | ICreateAttractionRaw[]> => {
  const { coordinates, radius } = body;

  const params = {
    TableName: TABLE_NAME_ATTRACTIONS,
    Select: 'ALL_ATTRIBUTES'
  };

  try {
    const res = await dbInstance.scan(params);
    if (!res) {
      return false;
    }

    const locations = res.Items;
    if (locations.length === 0) {
      return null;
    }

    const responseBody = locations.filter((location) =>
      locationInRadius(location, coordinates, radius)
    );
    console.log(responseBody);
    return responseBody as ICreateAttractionRaw[];
  } catch (err) {
    console.log(err.message);
    return false;
  }
};

const locationInRadius = (
  location: ICreateAttractionRaw,
  coordinates: ILocation,
  radius: number
): boolean => {
  const candidateLatitude = location.location.latitude / 57.29577951;
  const candidateLongitude = location.location.longitude / 57.29577951;

  const distance =
    3963.0 *
    1.609344 *
    Math.acos[
      Math.sin(coordinates.latitude) * Math.sin(candidateLatitude) +
        Math.cos(coordinates.latitude) *
          Math.cos(candidateLatitude) *
          Math.cos(candidateLongitude - coordinates.longitude)
    ];

  return distance <= radius;
};
