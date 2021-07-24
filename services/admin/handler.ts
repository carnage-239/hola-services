import 'source-map-support/register';

import { APIGatewayProxyHandler } from 'aws-lambda';

import { IResponse } from '../../common/interfaces/IResponse';
import { error } from '../../common/utils/http-response';
import registerDestinationHandler from './functions/attractions/register-destination';

//===================================== Definitions pretaining to attractions

export const registerAttraction: APIGatewayProxyHandler = async (
  event
): Promise<IResponse> => {
  if (!event || !event.body) {
    return error(400, '_', 'improve the errors');
  }
  const body = JSON.parse(event.body);
  const handlerResponse = await registerDestinationHandler(body);
  return handlerResponse;
};
