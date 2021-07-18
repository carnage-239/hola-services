import 'source-map-support/register';

import { APIGatewayProxyHandler } from 'aws-lambda';

import { IResponse } from '../../common/interfaces/IResponse';
import createUserHandler from './functions/create-user';
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
 * This end point is not available in the API.
 * This lambda gets invoked by the `command` service during service
 * orchestration to auhorize a user when a user is trying to login
 * to the web app. That is why the `event` object is passed to the
 * handler function instead of `event.body` object.
 *
 * ==== NOT BEING ORCHESTRATED ANYMORE =====
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
