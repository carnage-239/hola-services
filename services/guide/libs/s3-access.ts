import { v4 as uuidv4 } from 'uuid';

import S3 from '../../../common/libs/storage';
import { BUCKET_NAME_GUIDES } from '../config';
import { ISignedPhotoResponse, IUploadPhoto } from '../interfaces';

export const createSignedUrlForPhotoUpload = async (
  args: IUploadPhoto,
  ID: string,
  type: 'pan' | 'aadhar-front' | 'aadhar-back' | 'license'
): Promise<ISignedPhotoResponse | false> => {
  const key = `${uuidv4()}-${type}.${args.format}`;
  // const cv_url = `https://${BUCKET_NAME_PORTFOLIOS}.s3-${REGION}.amazonaws.com/${key}`;

  const params = {
    Bucket: BUCKET_NAME_GUIDES,
    Key: `${ID}/${key}`,
    ContentType: args.contentType,
    Expires: 100,
    ACL: 'public-read',
    Metadata: {
      ID,
      format: args.format
    }
  };

  try {
    const signed_url = await S3.getSignedUrlPromise('putObject', params);
    const photo_url = signed_url.split('?')[0];
    console.log(signed_url);
    console.log(photo_url);
    return {
      signed_url,
      photo_url,
      type
    } as ISignedPhotoResponse;
  } catch (err) {
    console.log(err.message);
    return false;
  }
};

export const deletePhotoFromS3 = async (
  ID: string,
  type: 'pan' | 'aadhar-front' | 'aadhar-back' | 'license'
): Promise<false> => {
  const listObjectsParams = {
    Bucket: BUCKET_NAME_GUIDES,
    Prefix: `${ID}`
  };

  try {
    const previousPortfolioPhotos = await S3.listObjects(
      listObjectsParams
    ).promise();

    if (previousPortfolioPhotos.Contents.length === 0) return;

    for (let i = 0; i < previousPortfolioPhotos.Contents.length; i++) {
      if (previousPortfolioPhotos.Contents[i].Key.includes(type)) {
        const previousPhotoKey = previousPortfolioPhotos.Contents[i].Key;
        console.log('deleting in S3 !!!', i);
        await S3.deleteObject({
          Bucket: BUCKET_NAME_GUIDES,
          Key: previousPhotoKey
        }).promise();
      }
    }
  } catch (err) {
    console.log('s3 failed to delete: ', err.message);
    return false;
  }
};
