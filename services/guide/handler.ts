import 'source-map-support/register';

import { APIGatewayProxyHandler } from 'aws-lambda';

import { IResponse } from '../../common/interfaces/IResponse';
import AuthService from '../../common/libs/auth';
import { tokenExpired, tokenInvalid } from '../../common/utils/http-response';
import guideCreateHandler from './functions/create-guide';
import fetchGuideHandler from './functions/fetch-guide';
import addGuideProfileDataHandler from './functions/guide-profile';
import guideVerificationHandler from './functions/guide-verification';
import photosPresignUploadHandler from './functions/photo-presign-upload';

export const licensePresignUpload: APIGatewayProxyHandler = async (
  event
): Promise<IResponse> => {
  const accessToken = AuthService.getAccessTokenFromHeaders(event);
  const ID = await AuthService.getUserIdFromToken(accessToken);

  if (ID === null) {
    return tokenInvalid();
  } else if (ID === false) {
    return tokenExpired();
  }
  const body = JSON.parse(event.body);
  const handlerResponse = await photosPresignUploadHandler(body, ID, 'license');
  return handlerResponse;
};

export const panPresignUpload: APIGatewayProxyHandler = async (
  event
): Promise<IResponse> => {
  const accessToken = AuthService.getAccessTokenFromHeaders(event);
  const ID = await AuthService.getUserIdFromToken(accessToken);

  if (ID === null) {
    return tokenInvalid();
  } else if (ID === false) {
    return tokenExpired();
  }
  const body = JSON.parse(event.body);
  const handlerResponse = await photosPresignUploadHandler(body, ID, 'pan');
  return handlerResponse;
};

export const aadharFrontPresignUpload: APIGatewayProxyHandler = async (
  event
): Promise<IResponse> => {
  const accessToken = AuthService.getAccessTokenFromHeaders(event);
  const ID = await AuthService.getUserIdFromToken(accessToken);

  if (ID === null) {
    return tokenInvalid();
  } else if (ID === false) {
    return tokenExpired();
  }
  const body = JSON.parse(event.body);
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
  const accessToken = AuthService.getAccessTokenFromHeaders(event);
  const ID = await AuthService.getUserIdFromToken(accessToken);

  if (ID === null) {
    return tokenInvalid();
  } else if (ID === false) {
    return tokenExpired();
  }
  const body = JSON.parse(event.body);
  const handlerResponse = await photosPresignUploadHandler(
    body,
    ID,
    'aadhar-back'
  );
  return handlerResponse;
};

export const guideCreate: APIGatewayProxyHandler = async (
  event
): Promise<IResponse> => {
  const accessToken = AuthService.getAccessTokenFromHeaders(event);
  const ID = await AuthService.getUserIdFromToken(accessToken);

  if (ID === null) {
    return tokenInvalid();
  } else if (ID === false) {
    return tokenExpired();
  }
  const body = JSON.parse(event.body);
  const handlerResponse = await guideCreateHandler(body, ID);
  return handlerResponse;
};

export const guideVerification: APIGatewayProxyHandler = async (
  event
): Promise<IResponse> => {
  const accessToken = AuthService.getAccessTokenFromHeaders(event);
  const ID = await AuthService.getUserIdFromToken(accessToken);

  if (ID === null) {
    return tokenInvalid();
  } else if (ID === false) {
    return tokenExpired();
  }
  const body = JSON.parse(event.body);
  const handlerResponse = await guideVerificationHandler(body, ID);
  return handlerResponse;
};

export const addGuideProfileData: APIGatewayProxyHandler = async (
  event
): Promise<IResponse> => {
  const accessToken = AuthService.getAccessTokenFromHeaders(event);
  const ID = await AuthService.getUserIdFromToken(accessToken);

  if (ID === null) {
    return tokenInvalid();
  } else if (ID === false) {
    return tokenExpired();
  }
  const body = JSON.parse(event.body);
  const handlerResponse = await addGuideProfileDataHandler(body, ID);
  return handlerResponse;
};

export const fetchGuide: APIGatewayProxyHandler = async (
  event
): Promise<IResponse> => {
  const accessToken = AuthService.getAccessTokenFromHeaders(event);
  const ID = await AuthService.getUserIdFromToken(accessToken);
  console.log({ accessToken, ID });

  if (ID === null) {
    return tokenInvalid();
  } else if (ID === false) {
    return tokenExpired();
  }
  const handlerResponse = await fetchGuideHandler(ID);
  return handlerResponse;
};
