import { IResponse } from '../../../common/interfaces/IResponse';
import AuthService from '../../../common/libs/auth';
import { error, response } from '../../../common/utils/http-response';
import { ILoginBody, IUser } from '../interfaces';
import {
  fetchUserByEmail,
  fetchUserByMobileNumber,
  generateJwtVersion,
  loginFailed,
  loginSuccess
} from '../libs/database-access';
import { loginSchemaValidator as validateRequestBodySchema } from '../libs/schema-validator';
import { authenticateUserCredentials } from '../libs/utils';

/**
 * @param body Request body of type IAuthorizeUserBody.
 * @returns 200 HTTP Response if user is successfully authoried.
 * @returns 400 HTTP Response if user is blocked/inactive.
 * @returns 404 HTTP Response for invalid ID.
 * @returns 500 http response if an unkown server error occurrs.
 */
const authorizeUser = async (body: ILoginBody): Promise<IResponse> => {
  const requestBodyIsValid = await validateRequestBodySchema(body);

  if (requestBodyIsValid !== true) {
    return requestBodyIsValid;
  }

  const { email, mobileNumber } = body;
  let user;

  if (email) {
    user = await fetchUserByEmail(email);
  } else {
    user = await fetchUserByMobileNumber(mobileNumber);
  }

  if (user === false) {
    return error(500, 30507, 'Database error while trying to fetch user data.');
  }

  if (user === null) {
    return error(400, 30428, 'Authentication failed.');
  }

  // User account will be blocked (User.active = false) if there are 10 invalid
  // login attempts done for the given User.
  //   if (user.is_active === false || user.failed_login_attempts >= 10) {
  //     return error(
  //       400,
  //       30415,
  //       'Account is blocked/inactive. Cannot authorize the login.'
  //     );
  //   }

  const passwordFromUser = body.password;
  const passwordFromDb = user.password;

  const userIsAuthenticated = await authenticateUserCredentials(
    passwordFromDb,
    passwordFromUser
  );

  if (!userIsAuthenticated) {
    await loginFailed(user.ID, user.failed_login_attempts);

    return error(400, 30427, 'Authentication failed.');
  }

  // If this is user's first login we have to generate `jwt_version` attribute
  // with default value of `1`. We can use this to revoke access of a user
  // if they forget their password or they are hacked. Basically when they
  // do a password reset, we will increment `jwt_version` value and all the
  // previously generated Access & Refresh tokens will become invalid.
  if (!user.jwt_version) {
    await generateJwtVersion(user.ID);
  }

  await loginSuccess(user.ID);
  delete user.password;
  const [accessToken, refreshToken] = await AuthService.generateTokens(user);

  const userData: IUser = {
    ID: user.ID,
    avatar: user.avatar,
    name: user.name,
    email: user.email,
    countryCode: user.countryCode,
    mobileNumber: user.mobileNumber,
    emailVerified: user.emailVerified,
    mobileNumberVerified: user.mobileNumberVerified,
    isActive: user.isActive,
    user_type: user.user_type
  };

  const responseBody = {
    access_token: accessToken,
    refresh_token: refreshToken,
    ID: user.ID,
    user: userData
  };

  return response(200, responseBody);
};

export default authorizeUser;
