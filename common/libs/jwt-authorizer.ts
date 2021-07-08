import AuthService from './auth';

export enum Authorizer {
  User,
  Admin,
  Business
}

/**
 * This is our custom Lambda Authorizer based on JWT. This authorizer lambda
 * will run before the routes that are protected with an access token.
 *
 * If the JWT access token in the `Authorization` header is valid, the authorizer
 * will return a policy that allow the access to the requested resource otherwise
 * it will return a policy that deny the access.
 *
 * Authorization header must contain Auth Bearer token.
 * @example Header: Authorization = "Bearer JWT_ACCESS_TOKEN"
 *
 * @param event AWS lambda event.
 */
const authorizer = async (
  event,
  _context,
  callback,
  authorizerKind: Authorizer
) => {
  const header = (event.headers['Authorization'] || '').trim();

  if (!header) {
    return AuthService.generatePolicy(false);
  }

  const [method, token] = header.split(' ');

  // Authroization header must be like - `Bearer JWT_ACCESS_TOKEN`
  if (!(method && token) || method !== 'Bearer') {
    return AuthService.generatePolicy(false);
  }

  const payload = await parseToken(token, authorizerKind);

  // Token in invalid.
  if (payload === null) {
    return AuthService.generatePolicy(false);
  }

  // Token is valid but expired.
  if (payload === false) {
    callback('Unauthorized');
  }

  return AuthService.generatePolicy(true);
};

const parseToken = async (token: string, authorizerKind: Authorizer) => {
  let payload: unknown;

  switch (authorizerKind) {
    case Authorizer.User:
      {
        payload = await AuthService.parseAccessToken(token);
      }
      break;

    case Authorizer.Admin:
      {
        payload = await AuthService.parseAdminAccessToken(token);
      }
      break;

    case Authorizer.Business:
      {
        payload = await AuthService.parseBusinessAccountAccessToken(token);
      }
      break;
  }

  return payload;
};

export const userAuthorizer = async (event, _context, callback) => {
  return await authorizer(event, _context, callback, Authorizer.User);
};

export const adminAuthorizer = async (event, _context, callback) => {
  return await authorizer(event, _context, callback, Authorizer.Admin);
};

export const businessAuthorizer = async (event, _context, callback) => {
  return await authorizer(event, _context, callback, Authorizer.Business);
};
