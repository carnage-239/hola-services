import { IResponse } from '../../../common/interfaces/IResponse';
import { error, response } from '../../../common/utils/http-response';
import { ICreateUserProfileBody } from '../interfaces';
import {
  createNewUserAndStoreToDb
  // fetchUserByEmail,
  // fetchUserByMobileNumber,
  // fetchUserByUsername
} from '../libs/database-access';
import { createUserAccountSchemaValidator as validateRequestBodySchema } from '../libs/schema-validator';

/**
 * Create a new user.
 *
 * @param body Request body of type ICreateUserProfileBody.
 * @returns 201 http response if a new user is successfully created.
 * @returns 400 http response if request body schema validation fails.
 * @returns 500 http response if a server error occurrs.
 */
const createUser = async (body: ICreateUserProfileBody): Promise<IResponse> => {
  const requestBodyIsValid = await validateRequestBodySchema(body);
  if (requestBodyIsValid !== true) {
    return requestBodyIsValid;
  }

  const newUserCreated = await createNewUserAndStoreToDb(body);
  if (newUserCreated === false) {
    return error(500, 30500, 'Database error while trying to create new user.');
  }
  return response(200, { userCreated: true, user: newUserCreated });
};

export default createUser;
