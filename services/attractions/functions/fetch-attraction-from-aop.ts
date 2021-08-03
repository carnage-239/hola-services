import { IResponse } from '../../../common/interfaces/IResponse';
import { error, response } from '../../../common/utils/http-response';
import { IAreaOfOperations, ICreateAttractionRaw } from '../interfaces';
import { fetchAttractionsUsingAOP as fetchAttractionsFromDB } from '../libs/database-access';

const fetchAttractionFromAOP = async (
  listOfAOP: IAreaOfOperations
): Promise<IResponse> => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const listOFAttractions: ICreateAttractionRaw[] =
    await fetchAttractionsFromDB(listOfAOP.aop);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (listOFAttractions === false) {
    return error(500, 50501, 'The DB client crashed while trying to fetch ');
  }

  if (listOFAttractions === null) {
    return error(400, 50401, '_');
  }

  return response(201, { listOFAttractions });
};

export default fetchAttractionFromAOP;
