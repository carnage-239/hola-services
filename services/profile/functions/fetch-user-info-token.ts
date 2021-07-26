import { IResponse } from '../../../common/interfaces/IResponse';
import AuthService from '../../../common/libs/auth';
import { error, response } from '../../../common/utils/http-response';
import {
  fetchUserByEmail,
  fetchUserByMobileNumber
} from '../libs/database-access';

export interface IFetchUserInfoPayload {
  access_token: string;
}

/**
 * @param token Request token
 * @returns 200 HTTP Response if user is successfully authoried.
 * @returns 400 HTTP Response if user is blocked/inactive.
 * @returns 404 HTTP Response for invalid ID.
 * @returns 500 http response if an unkown server error occurrs.
 */
const authorizeUser = async (
  body: IFetchUserInfoPayload
): Promise<IResponse> => {
  const email = await AuthService.getUserEmailFromExpiredToken(
    body.access_token
  );
  const mobileNumber = await AuthService.getUserMobileNumberFromExpiredToken(
    body.access_token
  );

  // console.log({ email, mobileNumber });

  let user;
  try {
    user = await fetchUserByEmail(email);
  } catch (err) {
    return error(500, 30507, 'Database error while trying to fetch user data.');
  }

  if (user === false) {
    return error(500, 30507, 'Database error while trying to fetch user data.');
  }
  if (user === null) {
    try {
      user = await fetchUserByMobileNumber(mobileNumber);
    } catch (err) {
      return error(
        500,
        30507,
        'Database error while trying to fetch user data.'
      );
    }
    return error(400, 30428, 'Authentication failed.');
  }

  return response(200, user);
};

export default authorizeUser;
