import 'source-map-support/register';

import { APIGatewayProxyHandler } from 'aws-lambda';

import { IResponse } from '../../common/interfaces/IResponse';
import photosPresignUploadHandler from './functions/photo-presign-upload';

export const licensePresignUpload: APIGatewayProxyHandler = async (
  event
): Promise<IResponse> => {
  const body = JSON.parse(event.body);
  const ID = event.pathParameters.ID;
  const handlerResponse = await photosPresignUploadHandler(body, ID, 'license');
  return handlerResponse;
};

export const panPresignUpload: APIGatewayProxyHandler = async (
  event
): Promise<IResponse> => {
  const body = JSON.parse(event.body);
  const ID = event.pathParameters.ID;
  const handlerResponse = await photosPresignUploadHandler(body, ID, 'pan');
  return handlerResponse;
};

export const aadharFrontPresignUpload: APIGatewayProxyHandler = async (
  event
): Promise<IResponse> => {
  const body = JSON.parse(event.body);
  const ID = event.pathParameters.ID;
  const handlerResponse = await photosPresignUploadHandler(
    body,
    ID,
    'aadhar-front'
  );
  return handlerResponse;
};

export const aadharBackPresignUpload: APIGatewayProxyHandler = async (
  event
): Promise<IResponse> => {
  const body = JSON.parse(event.body);
  const ID = event.pathParameters.ID;
  const handlerResponse = await photosPresignUploadHandler(
    body,
    ID,
    'aadhar-back'
  );
  return handlerResponse;
};
