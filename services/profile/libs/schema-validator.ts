import { IResponse } from '../../../common/interfaces/IResponse';
import { error } from '../../../common/utils/http-response';
import { ICreateUserProfileBody } from '../interfaces';
import * as schema from './schema-definition';

export const createUserAccountSchemaValidator = async (
  data: ICreateUserProfileBody
): Promise<IResponse | true> => {
  try {
    await schema.createUser.validateAsync(data);
    return true;
  } catch (err) {
    return error(400, 30426, err.details[0].message);
  }
};
