import 'source-map-support/register';

import { APIGatewayProxyHandler } from 'aws-lambda';

import { IResponse } from '../../common/interfaces/IResponse';
import { error } from '../../common/utils/http-response';
import addGuideToAttractionHandler from './functions/add-guide-to-attraction';
import fetchAttractionsUsingAOPHandler from './functions/fetch-attraction-from-aop';
import fetchAttractionUsingIDHandler from './functions/fetch-attraction-using-id';
import getNearbyLocationsHandler from './functions/fetch-nearby-locations';
import registerDestinationHandler from './functions/register-destination';
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

export const getNearbyLocations: APIGatewayProxyHandler = async (
  event
): Promise<IResponse> => {
  if (!event || !event.body) {
    return error(400, '_', 'improve the errors');
  }
  const body = JSON.parse(event.body);
  const handlerResponse = await getNearbyLocationsHandler(body);
  return handlerResponse;
};

export const fetchAttractionsUsingAOP: APIGatewayProxyHandler = async (
  event
): Promise<IResponse> => {
  if (!event || !event.body) {
    return error(400, '_', 'improve the errors');
  }
  const body = JSON.parse(event.body);
  const handlerResponse = await fetchAttractionsUsingAOPHandler(body);
  return handlerResponse;
};

export const fetchAttractionByID: APIGatewayProxyHandler = async (
  event
): Promise<IResponse> => {
  if (!event.pathParameters || !event.pathParameters.ID) {
    return error(400, '_', 'path parameter ID has not been provided');
  }
  const ID = event.pathParameters.ID;
  const handlerResponse = await fetchAttractionUsingIDHandler(ID);
  return handlerResponse;
};

export const addGuideToAttraction: APIGatewayProxyHandler = async (
  event
): Promise<IResponse> => {
  if (!event || !event.body) {
    return error(400, '_', 'improve the errors');
  }
  const body = JSON.parse(event.body);
  const handlerResponse = await addGuideToAttractionHandler(body);
  return handlerResponse;
};
