import { v4 as uuidv4 } from 'uuid';

import dbInstance from '../../../common/libs/database';
import { TABLE_NAME_USERS } from '../config';
import { ICreateUserProfileBody, IUserItem } from '../interfaces';
import { hashPassword } from './utils';

/**
 * @param body An object of tpye ICreateUserProfileBody.
 * @returns User if it is sucessfully created and stored to DB.
 * @returns false if DB action fails - 500 error.
 */
export const createNewUserAndStoreToDb = async (
  body: ICreateUserProfileBody
): Promise<IUserItem | false> => {
  const ID = 'user-' + uuidv4();
  const { firstName, lastName, email, mobileNumber, username, countryCode } =
    body;
  const usernameLowerCased = username.trim().toLowerCase();
  const password = await hashPassword(body.password);

  const avatar = {
    hash: null,
    small: null,
    medium: null,
    large: null
  };

  const user: IUserItem = {
    ID,
    email,
    avatar,
    username: usernameLowerCased,
    password,
    firstName,
    lastName,
    countryCode,
    mobileNumber: `${countryCode}${mobileNumber}`,
    emailVerified: false,
    mobileNumberVerified: false,
    isActive: true,
    jwtVersion: 1
  };

  const params = {
    TableName: TABLE_NAME_USERS,
    Item: user
  };

  try {
    await dbInstance.put(params);
    return user;
  } catch (err) {
    console.log(err.message);
    return false;
  }
};
