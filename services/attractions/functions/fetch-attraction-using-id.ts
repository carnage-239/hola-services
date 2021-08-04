import { IResponse } from '../../../common/interfaces/IResponse';
import { error, response } from '../../../common/utils/http-response';
import { fetchAttractionByID as fetchAttractionFromDB } from '../libs/database-access';

const fetchAttractionByID = async (ID: string): Promise<IResponse> => {
  const location = await fetchAttractionFromDB(ID);
  if (location === false) {
    return error(400, '_', 'dfdnfdk');
  }

  return response(201, { location });
};

export default fetchAttractionByID;
