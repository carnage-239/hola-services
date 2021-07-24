import { ICreateAttraction, ICreateAttractionRaw } from 'interfaces';
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
