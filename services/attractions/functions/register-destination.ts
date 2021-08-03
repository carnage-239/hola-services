import { IResponse } from '../../../common/interfaces/IResponse';
import { error, response } from '../../../common/utils/http-response';
import { ICreateAttraction } from '../interfaces';
import { registerTouristLocation as createLocationInDB } from '../libs/database-access';

const registerTouristLocation = async (
  data: ICreateAttraction
): Promise<IResponse> => {
  //! pending, complete this
  // const requestValid = validate(data);
  // if (requestValid === false) {
  //   return error(400, '_', 'dfdnfdk');
  // }

  const createLocation = await createLocationInDB(data);
  if (createLocation === false) {
    return error(400, '_', 'dfdnfdk');
  }

  return response(201, { createLocation });
};

export default registerTouristLocation;
