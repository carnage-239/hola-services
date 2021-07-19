import { IResponse } from '../../../common/interfaces/IResponse';
import { error, response } from '../../../common/utils/http-response';
import { IUploadPhoto } from '../interfaces';
import { createSignedUrlForPhotoUpload } from '../libs/s3-access';
import { photoPresignedUrlValidator as validateRequestBodySchema } from '../libs/schema-validator';

const photosPresignedUrl = async (
  body: IUploadPhoto,
  ID: string,
  type: 'pan' | 'aadhar-front' | 'aadhar-back' | 'license'
): Promise<IResponse> => {
  const requestBodyIsValid = await validateRequestBodySchema(body);
  if (requestBodyIsValid !== true) {
    return requestBodyIsValid;
  }
  if (!ID) {
    return error(400, '_', 'ID is required to generate presigned url');
  }

  const res = await createSignedUrlForPhotoUpload(body, ID, type);
  if (res === false) {
    return error(
      400,
      '_',
      'Error encountered while generating signed url, check logs'
    );
  }
  const { signed_url, photo_url } = res;
  return response(200, { signed_url, photo_url, type: res.type });
};

export default photosPresignedUrl;
