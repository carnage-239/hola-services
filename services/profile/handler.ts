import 'source-map-support/register';

import { APIGatewayProxyHandler } from 'aws-lambda';

import { IResponse } from '../../common/interfaces/IResponse';
import createUserHandler from './functions/create-user';

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
