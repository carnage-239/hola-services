import { IQuerySchema } from 'interfaces';

import { IResponse } from '../../../common/interfaces/IResponse';
import { error, response } from '../../../common/utils/http-response';
import { getNearbyLocations as fetchLocationsFromDB } from '../libs/database-access';

const registerTouristLocation = async (
  data: IQuerySchema
): Promise<IResponse> => {
  //! pending, complete this
  // const requestValid = validate(data);
  // if (requestValid === false) {
  //   return error(400, '_', 'dfdnfdk');
  // }

  const locations = await fetchLocationsFromDB(data);
  if (locations === false) {
    return error(400, '_', 'dfdnfdk');
  }

  return response(201, { locations });
};

export default registerTouristLocation;
