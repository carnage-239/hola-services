import { IResponse } from '../../../common/interfaces/IResponse';
import { error, response } from '../../../common/utils/http-response';
import { IGuide } from '../interfaces';
import { createGuide as createGuideInDB } from '../libs/database-access';
import { createGuideSchemaValidator as validateRequestBodySchema } from '../libs/schema-validator';

const createGuide = async (body: IGuide, ID: string): Promise<IResponse> => {
  const requestBodyIsValid = await validateRequestBodySchema(body);
  if (requestBodyIsValid !== true) {
    return requestBodyIsValid;
  }

  const createdGuide = await createGuideInDB(ID, body);
  if (createdGuide === false) {
    return error(
      500,
      40501,
      'Database error while trying to create new Guide in DB.'
    );
  }
  return response(200, { guide_created: true });
};

export default createGuide;
