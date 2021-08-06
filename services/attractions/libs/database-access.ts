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

    const responseBody = locations.filter((location: ICreateAttractionRaw) => {
      return locationInRadius(
        location as ICreateAttractionRaw,
        coordinates,
        radius
      );
    });

    return responseBody as ICreateAttractionRaw[];
  } catch (err) {
    console.log(err.message);
    return false;
  }
};

/**
 * Haversine formula: https://www.movable-type.co.uk/scripts/latlong.html
 * */
const locationInRadius = (
  location: ICreateAttractionRaw,
  coordinates: ILocation,
  radius: number
): boolean => {
  const R = 6371e3 / 1000; // km
  const φ1 = (location.location.latitude * Math.PI) / 180; // φ, λ in radians
  const φ2 = (coordinates.latitude * Math.PI) / 180;

  const Δφ =
    ((coordinates.latitude - location.location.latitude) * Math.PI) / 180;
  const Δλ =
    ((coordinates.longitude - location.location.longitude) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c;
  console.log('distance: ', distance);

  return distance <= radius;
};

export const updateAttraction = async (
  data: ICreateAttractionRaw
): Promise<ICreateAttractionRaw | false> => {
  const insertion: ICreateAttractionRaw = {
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

export const fetchAttraction = async (
  name: string
): Promise<ICreateAttractionRaw | false> => {
  const params = {
    TableName: TABLE_NAME_ATTRACTIONS,
    IndexName: 'name-index',
    KeyConditionExpression: 'name = :nameVal',
    ExpressionAttributeValues: {
      nameVal: name
    }
  };

  try {
    const result = await dbInstance.query(params);
    if (result.Count === 0) {
      return null;
    } else {
      const attraction: ICreateAttractionRaw = result
        .Items[0] as ICreateAttractionRaw;
      return attraction;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const filterExpressionGenerator = (skills: string[]): string => {
  // 'contains (areaOfOperation, :category1) OR contains (areaOfOperation, :category2)'
  let res = '';
  skills.map((_skill: string, index: number) => {
    const entry = `contains (areaOfOperation, :category${index + 1}) OR `;
    res += entry;
  });
  // console.log(res.slice(0, -4));
  return res.slice(0, -4);
};

export const attributeValuesGenerator = (skills: string[]) => {
  // {
  //   ':category1': 'react',
  //   ':category2': 'redux'
  // }

  // eslint-disable-next-line prefer-const
  let res = {};
  skills.map((skill: string, index: number) => {
    res[`:category${index + 1}`] = skill;
  });
  // console.log(res);
  return res;
};

export const fetchAttractionsUsingAOP = async (
  aops: string[]
): Promise<ICreateAttractionRaw[] | null | false> => {
  const filterExp = filterExpressionGenerator(aops);
  const attributeVal = attributeValuesGenerator(aops);
  const params = {
    TableName: TABLE_NAME_ATTRACTIONS,
    Select: 'ALL_ATTRIBUTES',
    FilterExpression: filterExp,
    ExpressionAttributeValues: attributeVal
  };

  try {
    const result = await dbInstance.scan(params);
    if (result.Count === 0) {
      return null;
    } else {
      return result.Items as ICreateAttractionRaw[];
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const fetchAttractionByID = async (
  ID: string
): Promise<ICreateAttractionRaw | null | false> => {
  const params = {
    TableName: TABLE_NAME_ATTRACTIONS,
    KeyConditionExpression: 'ID = :id',
    ExpressionAttributeValues: {
      ':id': ID
    }
  };

  try {
    const result = await dbInstance.query(params);
    if (result.Count === 0) {
      return null;
    }
    return result.Items[0] as ICreateAttractionRaw;
  } catch (error) {
    console.log(error.message);
    return false;
  }
};
