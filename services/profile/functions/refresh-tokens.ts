import { IResponse } from '../../../common/interfaces/IResponse';
import AuthService, { TokenType } from '../../../common/libs/auth';
import { error, response } from '../../../common/utils/http-response';
import { IRefreshTokenBody, IUserItem } from '../interfaces';
import { fetchUserData } from '../libs/database-access';
import { refreshTokenSchemaValidator as validateRequestBodySchema } from '../libs/schema-validator';

/**
 * Verify the JWT refresh token and return new access and refresh tokens.
 *
 * @param body Request body of type IRefreshTokenBody
 * @returns 200 HTTP response with new access token and refresh token.
 * @returns 403 HTTP response if Refresh Token in body is invalid.
 * @returns 500 HTTP response if an unknown server error occurs.
 */
const refreshTokens = async (body: IRefreshTokenBody): Promise<IResponse> => {
  const requestBodyIsValid = await validateRequestBodySchema(body);

  if (requestBodyIsValid !== true) {
    return requestBodyIsValid;
  }

  const refreshToken = body.refresh_token;

  const refreshTokenPayload = await AuthService.parseRefreshToken(refreshToken);

  if (refreshTokenPayload === null) {
    return error(403, 30422, 'Not authorized.');
  }

  if (
    refreshTokenPayload.token_type !== TokenType.RefreshToken ||
    refreshTokenPayload.user.isActive !== true
  ) {
    return error(403, 30422, 'Not authorized.');
  }

  const ID = refreshTokenPayload.user.id;

  const user: IUserItem | false = await fetchUserData(ID);

  if (user === false) {
    return error(500, 30510, 'Database error while trying to fetch user data.');
  }

  if (user === null) {
    return error(404, 30423, 'User not found.');
  }

  if (refreshTokenPayload.user.jwtVersion !== user.jwtVersion) {
    return error(403, 30422, 'Not authorized.');
  }

  const [newAccessToken, newRefreshToken] = await AuthService.generateTokens(
    user
  );

  const responseBody = {
    access_token: newAccessToken,
    refresh_token: newRefreshToken
  };

  return response(200, responseBody);
};

export default refreshTokens;
