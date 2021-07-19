import dbInstance from '../../../common/libs/database';
import { TABLE_NAME_GUIDES } from '../config';
import { IGuideVerification, IGuideVerificationDataInDB } from '../interfaces';

export const putGuideVerificationDetails = async (
  body: IGuideVerification
): Promise<IGuideVerificationDataInDB | false> => {
  const insertData: IGuideVerificationDataInDB = {
    ID: body.ID,
    email: body.email,
    mobileNumber: body.mobileNumber,
    panNumber: body.panNumber,
    panCardImageLink: body.panCardImageLink,
    aadharNumber: body.aadharNumber,
    backAadharImageLink: body.backAadharImageLink,
    frontAadharImageLink: body.frontAadharImageLink,
    tourGuideLicenseImageLink: body.tourGuideLicenseImageLink
  };

  const params = {
    TableName: TABLE_NAME_GUIDES,
    Item: insertData
  };

  try {
    await dbInstance.put(params);
    return insertData;
  } catch (error) {
    return false;
  }
};
