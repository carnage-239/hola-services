import { IResponse } from '../../../common/interfaces/IResponse';
import { error, response } from '../../../common/utils/http-response';
import { IGuideProfileData } from '../interfaces';
import { addGuideProfileData as addGuideProfileDataInDb } from '../libs/database-access';
import { addGuideProfileDataSchemaValidator as validateRequestBodySchema } from '../libs/schema-validator';

const GuideProfileData = async (
  body: IGuideProfileData,
  ID: string
): Promise<IResponse> => {
  const requestBodyIsValid = await validateRequestBodySchema(body);
  if (requestBodyIsValid !== true) {
    return requestBodyIsValid;
  }

  const addedVerificationData = await addGuideProfileDataInDb(ID, body);
  if (addedVerificationData === false) {
    return error(
      500,
      40500,
      'Database error while trying to add Guide Profile Data.'
    );
  }
  return response(200, { added_profile_data: true });
};

export default GuideProfileData;
