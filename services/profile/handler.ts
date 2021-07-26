import 'source-map-support/register';

import { APIGatewayProxyHandler } from 'aws-lambda';

import { IResponse } from '../../common/interfaces/IResponse';
import createUserHandler from './functions/create-user';
import fetchUserInfoFromTokenHandler from './functions/fetch-user-info-token';
import loginHandler from './functions/login';
import refreshTokensHandler from './functions/refresh-tokens';

/**
 * POST - /users
 * Create a user.
 */
export const createUser: APIGatewayProxyHandler = async (
  event
): Promise<IResponse> => {
  const body = JSON.parse(event.body);
  const handlerResponse = await createUserHandler(body);
  return handlerResponse;
};

/**
 * POST - /users/login
 */
export const login = async (event): Promise<IResponse> => {
  const body = JSON.parse(event.body);
  const handlerResponse = await loginHandler(body);
  return handlerResponse;
};

/**
 * POST - /user/refresh-tokens
 * User can refresh their Access and Refresh token when their access token expires.
 */
export const refreshTokens = async (event): Promise<IResponse> => {
  const body = JSON.parse(event.body);
  const handlerResponse = await refreshTokensHandler(body);
  return handlerResponse;
};

/**
 * POST - /user/token-info
 * User can give tokens, expired or so and fetch user information
 */
export const fetchUserInfoFromToken = async (event): Promise<IResponse> => {
  const body = JSON.parse(event.body);
  const handlerResponse = await fetchUserInfoFromTokenHandler(body);
  return handlerResponse;
};
