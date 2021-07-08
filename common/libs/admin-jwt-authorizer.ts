import AuthService from './auth';

/**
 * This is our custom Lambda Authorizer based on JWT. This authorizer lambda
 * will run before the routes that are protected with an access token.
 *
 * If the JWT access token in the `Authorization` header is valid, the authorizer
 * will return a policy that allow the access to the requested resource otherwise
 * it will return a policy that deny the access.
 *
 *
 * Authorization header must contain Auth Bearer token.
 * @example Header: Authorization = "Bearer JWT_ACCESS_TOKEN"
 *
 * @param event AWS lambda event.
 */
const authorizer = async (event, _context, callback) => {
  const header = (event.headers['Authorization'] || '').trim();

  if (!header) {
    return AuthService.generatePolicy(false);
  }

  const [method, token] = header.split(' ');

  // Authroization header must be like - `Bearer JWT_ACCESS_TOKEN`
  if (!(method && token) || method !== 'Bearer') {
    return AuthService.generatePolicy(false);
  }

  const decodedJWT = await AuthService.parseAdminAccessToken(token);

  // Token in invalid.
  if (decodedJWT === null) {
    return AuthService.generatePolicy(false);
  }

  // Token is valid but expired.
  if (decodedJWT === false) {
    callback('Unauthorized');
  }

  return AuthService.generatePolicy(true);
};

export default authorizer;
