import { IResponse } from '../../../common/interfaces/IResponse';
import { error, response } from '../../../common/utils/http-response';
import {
  fetchUserByMobileNumber,
  fetchUserData
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
  ID: string,
  mobileNumber: string
): Promise<IResponse> => {
  // console.log(body);
  // const email = await AuthService.getUserEmailFromToken(body.access_token);
  // const mobileNumber = await AuthService.getMobileNumberFromToken(
  //   body.access_token
  // );

  // console.log(email);
  // // console.log({ email, mobileNumber });

  let user;
  try {
    user = await fetchUserData(ID);
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
    return error(400, 30428, 'No such user exists.');
  }

  return response(200, user);
};

export default authorizeUser;
