import { IResponse } from '../../../common/interfaces/IResponse';
import { error, response } from '../../../common/utils/http-response';
import { IGuideVerification } from '../interfaces';
import { putGuideVerificationDetails } from '../libs/database-access';
import { guideVerificationSchemaValidator as validateRequestBodySchema } from '../libs/schema-validator';

const addGuideVerificationDetails = async (
  body: IGuideVerification,
  ID: string
): Promise<IResponse> => {
  const requestBodyIsValid = await validateRequestBodySchema(body);
  if (requestBodyIsValid !== true) {
    return requestBodyIsValid;
  }

  const addedVerificationData = await putGuideVerificationDetails(ID, body);
  if (addedVerificationData === false) {
    return error(
      500,
      40500,
      'Database error while trying to add Guide Verification Data.'
    );
  }
  return response(200, { sentForVerification: addedVerificationData });
};

export default addGuideVerificationDetails;
