import { IResponse } from '../../../common/interfaces/IResponse';
import { error } from '../../../common/utils/http-response';
import { ICreateUserProfileBody, ILoginBody } from '../interfaces';
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

export const loginSchemaValidator = async (
  data: ILoginBody
): Promise<IResponse | true> => {
  try {
    await schema.login.validateAsync(data);
    return true;
  } catch (err) {
    return error(400, 30426, err.details[0].message);
  }
};

export const refreshTokenSchemaValidator = async (data: unknown) => {
  try {
    await schema.refreshTokensBodySchema.validateAsync(data);
    return true;
  } catch (err) {
    return error(400, 20401, err.details[0].message);
  }
};
