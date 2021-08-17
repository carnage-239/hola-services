import { v4 as uuidv4 } from 'uuid';

import dbInstance from '../../../common/libs/database';
import { TABLE_NAME_GUIDES } from '../config';
import {
  IGuideBasicDetails,
  IGuideProfileData,
  IGuideRaw,
  IGuideVerification,
  IGuideVerificationDataInDB
} from '../interfaces';

export const createGuide = async (
  ID: string,
  body: IGuideBasicDetails
): Promise<IGuideRaw | false> => {
  const guideID = 'guide-' + uuidv4();
  const insertData: IGuideBasicDetails = {
    ...body
  };
  const insertProfileData: IGuideProfileData = {
    applicationStatus: 'pending',
    verified: false
  };

  const returnData: IGuideRaw = {
    ID,
    guideID,
    basicDetails: body,
    profileData: { ...insertProfileData }
  };

  const params = {
    TableName: TABLE_NAME_GUIDES,
    Key: {
      ID
    },
    UpdateExpression: 'SET #basicdata = :b, #guideID = :g, #profileData = :p',
    ExpressionAttributeNames: {
      '#basicdata': 'basicDetails',
      '#guideID': 'guideID',
      '#profileData': 'profileData'
    },
    ExpressionAttributeValues: {
      ':b': insertData,
      ':g': guideID,
      ':p': insertProfileData
    }
  };

  try {
    await dbInstance.update(params);
    return returnData;
  } catch (error) {
    return false;
  }
};

export const fetchGuide = async (ID: string): Promise<IGuideRaw | false> => {
  const params = {
    TableName: TABLE_NAME_GUIDES,
    Key: {
      ID
    }
  };

  try {
    const res = await dbInstance.get(params);
    const guide = res.Item;

    if (!guide) {
      return null;
    }
    return guide as IGuideRaw;
  } catch (error) {
    return false;
  }
};

export const putGuideVerificationDetails = async (
  ID: string,
  body: IGuideVerification
): Promise<IGuideVerificationDataInDB | false> => {
  const insertData: IGuideVerificationDataInDB = {
    ...body
  };

  const params = {
    TableName: TABLE_NAME_GUIDES,
    Key: {
      ID
    },
    UpdateExpression: 'SET #verification = :v',
    ExpressionAttributeNames: {
      '#verification': 'verificationData'
    },
    ExpressionAttributeValues: {
      ':v': insertData
    }
  };

  try {
    await dbInstance.update(params);
    return insertData;
  } catch (error) {
    return false;
  }
};

export const addGuideProfileData = async (
  ID: string,
  body: IGuideProfileData
): Promise<IGuideProfileData | false> => {
  const params = {
    TableName: TABLE_NAME_GUIDES,
    Key: {
      ID
    },
    UpdateExpression: 'SET #profile = :p',
    ExpressionAttributeNames: {
      '#profile': 'profileData'
    },
    ExpressionAttributeValues: {
      ':p': body
    }
  };

  try {
    await dbInstance.update(params);
  } catch (error) {
    return false;
  }
};
