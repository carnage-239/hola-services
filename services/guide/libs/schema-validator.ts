import { IResponse } from '../../../common/interfaces/IResponse';
import { error } from '../../../common/utils/http-response';
import { IGuideVerification, IUploadPhoto } from '../interfaces';
import * as schema from './schema-definition';

export const guideVerificationSchemaValidator = async (
  data: IGuideVerification
): Promise<IResponse | true> => {
  try {
    await schema.guideVerficationSchema.validateAsync(data);
    return true;
  } catch (err) {
    return error(400, 40426, err.details[0].message);
  }
};

export const photoPresignedUrlValidator = async (
  data: IUploadPhoto
): Promise<IResponse | true> => {
  try {
    await schema.photoPresignedUrl.validateAsync(data);
    return true;
  } catch (err) {
    return error(400, 40426, err.details[0].message);
  }
};
