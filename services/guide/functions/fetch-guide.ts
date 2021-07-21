import { IResponse } from '../../../common/interfaces/IResponse';
import { error, response } from '../../../common/utils/http-response';
import { fetchGuide as fetchGuideFromDB } from '../libs/database-access';

const fetchGuide = async (ID: string): Promise<IResponse> => {
  const Guide = await fetchGuideFromDB(ID);
  if (Guide === false) {
    return error(
      500,
      40502,
      'Database error while trying to fetch Guide in DB.'
    );
  }
  if (Guide === null) {
    return error(400, 40401, 'no guide exists in database with given ID.');
  }
  return response(200, { data: Guide });
};

export default fetchGuide;
