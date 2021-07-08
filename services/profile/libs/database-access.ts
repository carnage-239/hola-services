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
  const { name, email, mobileNumber, countryCode } = body;
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
    password,
    name,
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

// /**
//  * @param profile Google OAuth profile response
//  * @returns User if it is sucessfully created and stored to DB.
//  * @returns false if DB action fails - 500 error.
//  */
// export const createOAuthUser = async (
//   profile: IOAuthProfile
// ): Promise<IUserItem | Error> => {
//   const ID: string = 'user-' + uuidv4();
//   const first_name: string = profile.name.givenName;
//   const last_name: string = profile.name.familyName;
//   const email: string =
//     (profile.emails && profile?.emails[0]?.value) || profile?.email;
//   const email_verified: boolean =
//     profile.emails && profile?.emails[0]?.verified;
//   const referral_code = generateReferralCode(first_name.split(' ')[0]);
//   const avatar = {
//     hash: null,
//     small: null,
//     medium: null,
//     large: null
//   };

//   let user: IUserItem = {
//     ID,
//     avatar,
//     username: referral_code,
//     email,
//     first_name,
//     last_name,
//     email_verified,
//     is_active: true,
//     wiseup_foundation: true,
//     failed_login_attempts: 0,
//     jwt_version: 1,
//     referral_code
//   };

//   switch (profile.provider) {
//     case 'google': {
//       const googleOAuthID = profile.id;
//       user = { ...user, googleOAuthID };
//       break;
//     }

//     case 'linkedin': {
//       const linkedinOAuthID = profile.id;
//       user = { ...user, linkedinOAuthID };
//       break;
//     }

//     case 'facebook': {
//       const facebookOAuthID = profile.id;
//       user = { ...user, facebookOAuthID };
//       break;
//     }

//     default:
//       return new Error('OAuth Provider missing or invalid');
//   }

//   const params = {
//     TableName: TABLE_NAME_USERS,
//     Item: user
//   };

//   try {
//     await dbInstance.put(params);
//     return user;
//   } catch (err) {
//     return new Error('Database error while trying to create the user');
//   }
// };

// /**
//  * @param ID It is the uuid of the user to find the user in the DB.
//  * @returns false if the DynamoDB action failed to mark email as verified.
//  */
// export const markEmailVerified = async (ID: string): Promise<false> => {
//   const params = {
//     TableName: TABLE_NAME_USERS,
//     Key: {
//       ID: ID
//     },
//     UpdateExpression: 'set email_verified = :setTrue',
//     ConditionExpression: 'ID = :idVal',
//     ExpressionAttributeValues: {
//       ':setTrue': true,
//       ':idVal': ID
//     },
//     ReturnValues: 'ALL_NEW'
//   };

//   try {
//     await dbInstance.update(params);
//   } catch (err) {
//     return false;
//   }
// };

// /**
//  * @param ID It is the uuid of the user to find the user in the DB.
//  * @param otp The one time password.
//  * @param mobile_number It is the mobile_number the user provided to be saved.
//  * @returns false if the given `ID` is invalid or DynamoDB action failed.
//  */
// export const storeNumberAndOtpToDb = async (
//   ID: string,
//   mobile_number: string,
//   otp: string,
//   otp_expires_on: number
// ): Promise<false> => {
//   const params = {
//     TableName: TABLE_NAME_USERS,
//     Key: {
//       ID: ID
//     },
//     UpdateExpression:
//       'set mobile_number = :numberVal,  otp = :otpVal, otp_expires_on = :otpExpireVal, mobile_number_verified = :setFalse',
//     ConditionExpression: 'ID = :idVal',
//     ExpressionAttributeValues: {
//       ':idVal': ID,
//       ':numberVal': mobile_number,
//       ':otpVal': otp,
//       ':otpExpireVal': otp_expires_on,
//       ':setFalse': false
//     },
//     ReturnValues: 'ALL_NEW'
//   };

//   try {
//     await dbInstance.update(params);
//   } catch (err) {
//     return false;
//   }
// };

// /**
//  * @param ID It is the uuid of the user to find the user in the DB.
//  * @returns false if the DynamoDB client action failed to mark it as verified.
//  */
// export const markMobileVerified = async (ID: string): Promise<false> => {
//   const params = {
//     TableName: TABLE_NAME_USERS,
//     Key: {
//       ID: ID
//     },
//     UpdateExpression:
//       'set mobile_number_verified = :setTrue remove otp, otp_expires_on',
//     ConditionExpression: 'ID = :idVal',
//     ExpressionAttributeValues: {
//       ':setTrue': true,
//       ':idVal': ID
//     },
//     ReturnValues: 'ALL_NEW'
//   };

//   try {
//     await dbInstance.update(params);
//   } catch (err) {
//     return false;
//   }
// };

// /**
//  * @param ID It is the uuid of the user to find the user in the DB.
//  * @returns false if the DynamoDB client action failed .
//  */
// export const storeUserTypeToDb = async (
//   ID: string,
//   user_type: string[]
// ): Promise<false> => {
//   const params = {
//     TableName: TABLE_NAME_USERS,
//     Key: {
//       ID: ID
//     },
//     UpdateExpression: 'set user_type = :userTypeVal, is_active = :setTrue',
//     ExpressionAttributeValues: {
//       ':userTypeVal': user_type,
//       ':setTrue': true
//     },
//     ReturnValues: 'ALL_NEW'
//   };

//   try {
//     await dbInstance.update(params);
//   } catch (err) {
//     return false;
//   }
// };

/**
 * @param mobileNumber Find user account connected to this number.
 * @returns user data from the table if user found.
 * @return null if no user found.
 * @returns false if the DynamoDB action fails.
 */
export const fetchUserByMobileNumber = async (
  mobileNumber: string
): Promise<IUserItem | null | false> => {
  const params = {
    TableName: TABLE_NAME_USERS,
    IndexName: 'mobile-number-index',
    KeyConditionExpression: 'mobileNumber = :mobileNumberVal',
    ExpressionAttributeValues: {
      ':mobileNumberVal': mobileNumber
    }
  };

  // The following conditions are being validated to see if any user with the
  // given `mobile_number` already exists.
  // Phone number must be unique
  try {
    const result = await dbInstance.query(params);

    if (result.Count === 0) {
      // No account is connected with the `mobileNumber`.
      return null;
    } else {
      // `mobileNumber` is connected with an account.
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const user: IUserItem = result.Items[0];
      return user;
    }
  } catch (err) {
    return false;
  }
};

/**
 * @param email Find user account connected to this email.
 * @returns user data from the table if user found.
 * @return null if no user found.
 * @returns false if the DynamoDB action fails.
 */
export const fetchUserByEmail = async (
  email: string
): Promise<IUserItem | null | false> => {
  const params = {
    TableName: TABLE_NAME_USERS,
    IndexName: 'email-index',
    KeyConditionExpression: 'email = :emailVal',
    ExpressionAttributeValues: {
      ':emailVal': email
    }
  };

  // The following conditions are being validated to see if any user with the
  // given `mobile_number` already exists.
  // Phone number must be unique
  try {
    const result = await dbInstance.query(params);

    if (result.Count === 0) {
      // No user account connected with the given email.
      return null;
    } else {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const user: IUserItem = result.Items[0];
      return user;
    }
  } catch (err) {
    console.log(err.message);
    return false;
  }
};

// /**
//  * @param username Find user account connected to this username.
//  * @returns user data from the table if user found.
//  * @return null if no user found.
//  * @returns false if the DynamoDB action fails.
//  */
// export const fetchUserByUsername = async (
//   username: string
// ): Promise<IUserItem | null | false> => {
//   const usernameLowerCased = username.toLowerCase();

//   const params = {
//     TableName: TABLE_NAME_USERS,
//     IndexName: 'username-index',
//     KeyConditionExpression: 'username = :usernameVal',
//     ExpressionAttributeValues: {
//       ':usernameVal': usernameLowerCased
//     }
//   };

//   try {
//     const result = await dbInstance.query(params);

//     if (result.Count === 0) {
//       // No user account connected with the given email.
//       return null;
//     } else {
//       // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//       // @ts-ignore
//       const user: IUserItem = result.Items[0];
//       return user;
//     }
//   } catch (err) {
//     return false;
//   }
// };

// /**
//  * @param profile OAuth profile details (mainly ID and provider details needed)
//  * @returns user data from the table if user found.
//  * @return null if no user found.
//  * @returns false if the DynamoDB action fails.
//  */
// export const fetchUserByOAuthProfile = async (
//   profile: IOAuthProfile
// ): Promise<IUserItem | null | Error> => {
//   const params = {
//     TableName: TABLE_NAME_USERS,
//     FilterExpression: '#id = :idVal',
//     ExpressionAttributeValues: {
//       ':idVal': profile.id
//     },
//     ExpressionAttributeNames: {}
//   };

//   switch (profile.provider) {
//     case 'google': {
//       params.ExpressionAttributeNames = {
//         '#id': 'googleOAuthID'
//       };
//       break;
//     }

//     case 'linkedin': {
//       params.ExpressionAttributeNames = {
//         '#id': 'linkedinOAuthID'
//       };
//       break;
//     }

//     case 'facebook': {
//       params.ExpressionAttributeNames = {
//         '#id': 'facebookOAuthID'
//       };
//       break;
//     }

//     default: {
//       return new Error('OAuth Provider missing or invalid');
//     }
//   }

//   try {
//     const result = await dbInstance.scan(params);

//     if (result.Count === 0) {
//       // User with `id` don't exists.
//       return null;
//     } else {
//       const user: IUserItem = result.Items[0] as IUserItem;
//       return user;
//     }
//   } catch (err) {
//     return new Error(
//       'Database error while trying to check if user exists with the given OAuth Profile ID'
//     );
//   }
// };

/**
 * @param ID user's uuid.
 * @returns user if user esists in the DB.
 * @returns null if no user found.
 * @returns false if DB actions fails - 500 Error.
 */
export const fetchUserData = async (ID: string): Promise<IUserItem | false> => {
  const params = {
    TableName: TABLE_NAME_USERS,
    Key: {
      ID
    }
  };

  try {
    const result = await dbInstance.get(params);

    if (!result.Item) {
      // User not found.
      return null;
    } else {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const user: IUserItem = result.Item;
      return user;
    }
  } catch (err) {
    return false;
  }
};

/**
 * @param ID User's unique identifier.
 * @returns false if the DynamoDB action fails.
 */
export const generateJwtVersion = async (ID: string): Promise<false> => {
  const params = {
    TableName: TABLE_NAME_USERS,
    Key: {
      ID
    },
    UpdateExpression: 'set #jwtVersion = :value',
    ExpressionAttributeNames: {
      '#jwtVersion': 'jwt_version'
    },
    ExpressionAttributeValues: {
      ':value': 1
    },
    ReturnValues: 'ALL_NEW'
  };

  try {
    await dbInstance.update(params);
  } catch (e) {
    return false;
  }
};

// /**
//  * @param ID User's unique identifier.
//  * @returns false if the DynamoDB action fails.
//  */
// export const incrementJwtVersion = async (ID: string): Promise<false> => {
//   const params = {
//     TableName: TABLE_NAME_USERS,
//     Key: {
//       ID
//     },
//     UpdateExpression: 'set #jwtVersion = #jwtVersion + :inc',
//     ExpressionAttributeNames: {
//       '#jwtVersion': 'jwt_version'
//     },
//     ExpressionAttributeValues: {
//       ':inc': 1
//     }
//   };

//   try {
//     await dbInstance.update(params);
//   } catch (e) {
//     return false;
//   }
// };

// /**
//  * Add the `simplybook_client_id` attribute to the `Item`.
//  *
//  * @param ID User's unique identifier.
//  * @param clientId SimplyBook's client ID for the user.
//  * @returns false if the DynamoDB action fails.
//  */
// export const addSimplyBookClientId = async (ID: string, clientId: string) => {
//   const params = {
//     TableName: TABLE_NAME_USERS,
//     Key: {
//       ID
//     },
//     UpdateExpression: 'set #clientId = :clientIdVal',
//     ExpressionAttributeNames: {
//       '#clientId': 'simplybook_client_id'
//     },
//     ExpressionAttributeValues: {
//       ':clientIdVal': clientId
//     }
//   };

//   try {
//     await dbInstance.update(params);
//   } catch (e) {
//     return false;
//   }
// };

/**
 * @param ID User's unique identifier.
 * @param currentCount The current count of `failed_login_attempts`.
 * @returns false if DynamoDB action fails.
 */
export const loginFailed = async (ID: string, currentCount: number) => {
  const newCount = currentCount + 1;

  // Set `is_active` to false (user is blocked) if the failed_attempts_count is 9
  // and this is their 10th attempt.
  if (currentCount === 9) {
    const params = {
      TableName: TABLE_NAME_USERS,
      Key: {
        ID
      },
      UpdateExpression:
        'set is_active= :setFalse, failed_login_attempts = :setNewCount',
      ExpressionAttributeValues: {
        ':setFalse': false,
        ':setNewCount': newCount
      },
      ReturnValues: 'ALL_NEW'
    };

    try {
      await dbInstance.update(params);
      return true;
    } catch (err) {
      return false;
    }
  }

  const params = {
    TableName: TABLE_NAME_USERS,
    Key: {
      ID
    },
    UpdateExpression: 'set failed_login_attempts = :setNewCount',
    ExpressionAttributeValues: {
      ':setNewCount': newCount
    },
    ReturnValues: 'ALL_NEW'
  };

  try {
    await dbInstance.update(params);
    return true;
  } catch (err) {
    return false;
  }
};

/**
 * Whenever user login successfully, we have to reset the failed_login_attempts
 * count to 0 otherwise the count will reach 10 on later failed login attempts
 * and the user will account will be blocked.
 *
 * @param ID User's unique identifier.
 * @returns false if DynamoDB action fails.
 */
export const loginSuccess = async (ID: string) => {
  const params = {
    TableName: TABLE_NAME_USERS,
    Key: {
      ID
    },
    UpdateExpression: 'set failed_login_attempts = :resetCount',
    ExpressionAttributeValues: {
      ':resetCount': 0
    },
    ReturnValues: 'ALL_NEW'
  };

  try {
    await dbInstance.update(params);
    return true;
  } catch (err) {
    return false;
  }
};

// /**
//  * @param ID User's unique identifier.
//  * @param password The user's new password.
//  * @returns false If DynamoDB action fails.
//  */
// export const resetPassword = async (ID: string, password: string) => {
//   const salt = await bcrypt.genSalt(10);

//   // Encrypt the password before saving to the DB
//   const passwordEncrypted = await bcrypt.hash(password, salt);

//   const params = {
//     TableName: TABLE_NAME_USERS,
//     Key: {
//       ID
//     },
//     UpdateExpression:
//       'set password = :passwordVal, failed_login_attempts = :resetCount, is_active = :setTrue, #jwtVersion = #jwtVersion + :inc remove password_reset_token',
//     ExpressionAttributeNames: {
//       '#jwtVersion': 'jwt_version'
//     },
//     ExpressionAttributeValues: {
//       ':passwordVal': passwordEncrypted,
//       ':resetCount': 0,
//       ':setTrue': true,
//       ':inc': 1
//     },
//     ReturnValues: 'ALL_NEW'
//   };

//   try {
//     const res = await dbInstance.update(params);
//     return res;
//   } catch (err) {
//     return false;
//   }
// };

// /**
//  * Add the JWT token to `password_reset_token` attribute.
//  *
//  * @params ID User's unique identifier.
//  * @params token JWT token.
//  * @returns false if DynamoDB action fails.
//  */
// export const addPasswordResetToken = async (
//   ID: string,
//   token: string
// ): Promise<false> => {
//   const params = {
//     TableName: TABLE_NAME_USERS,
//     Key: {
//       ID
//     },
//     UpdateExpression: 'set password_reset_token= :token',
//     ExpressionAttributeValues: {
//       ':token': token
//     }
//   };

//   try {
//     await dbInstance.update(params);
//   } catch (err) {
//     return false;
//   }
// };

// /**
//  * Delete a user Item from the database.
//  *
//  * @params ID User's unique identifier.
//  * @returns true if the user is deleted successfully.
//  * @returns false if DynamoDB action fails.
//  */
// export const removeUser = async (ID: string): Promise<boolean> => {
//   const params = {
//     TableName: TABLE_NAME_USERS,
//     Key: {
//       ID
//     }
//   };

//   try {
//     await dbInstance.delete(params);
//     return true;
//   } catch {
//     return false;
//   }
// };

// /**
//  * Update the email of a user and mark `email_verified` as false
//  *
//  * @params ID User's unique identifier.
//  * @params newEmail Update the `email` attribute to this value.
//  * @returns false if DynamoDB action fails.
//  */
// export const updateEmail = async (
//   ID: string,
//   newEmail: string
// ): Promise<false> => {
//   const params = {
//     TableName: TABLE_NAME_USERS,
//     Key: {
//       ID
//     },
//     UpdateExpression: 'set email = :newEmail, email_verified = :setFalse',
//     ExpressionAttributeValues: {
//       ':newEmail': newEmail,
//       ':setFalse': false
//     }
//   };

//   try {
//     await dbInstance.update(params);
//   } catch (err) {
//     return false;
//   }
// };

// /**
//  * Update the mobile number of a user
//  *
//  * @params ID User's unique identifier
//  * @params country_code Mobile number's contry code
//  * @params mobile_number Mobile number
//  * @returns false if DynamoDB action fails
//  */
// export const updateMobileNumber = async (
//   ID: string,
//   country_code: string,
//   mobile_number: string
// ): Promise<false> => {
//   const newMobileNumber = `+${country_code}${mobile_number}`;

//   const params = {
//     TableName: TABLE_NAME_USERS,
//     Key: {
//       ID
//     },
//     UpdateExpression: 'set mobile_number = :newMobileNumber',
//     ExpressionAttributeValues: {
//       ':newMobileNumber': newMobileNumber
//     }
//   };

//   try {
//     await dbInstance.update(params);
//   } catch (err) {
//     return false;
//   }
// };

// /**
//  * Update the wiseup foundation status of a user
//  *
//  * @params ID User's unique identifier
//  * @params wiseup_foundation Wiseup Foundation status
//  * @returns false if DynamoDB action fails
//  */
// export const updateWiseupFoundation = async (
//   ID: string,
//   wiseup_foundation: boolean
// ): Promise<false> => {
//   const params = {
//     TableName: TABLE_NAME_USERS,
//     Key: {
//       ID
//     },
//     UpdateExpression: 'set wiseup_foundation = :newWiseupFoundation',
//     ExpressionAttributeValues: {
//       ':newWiseupFoundation': wiseup_foundation
//     }
//   };

//   try {
//     await dbInstance.update(params);
//   } catch (err) {
//     return false;
//   }
// };

// /**
//  * Update the password of a user
//  *
//  * @params ID User's unique identifier
//  * @params new_password Update the password of the user to this value
//  * @returns false if DynamoDB action fails
//  */
// export const updatePassword = async (
//   ID: string,
//   new_password: string
// ): Promise<false> => {
//   const hashedPassword = await hashPassword(new_password);

//   const params = {
//     TableName: TABLE_NAME_USERS,
//     Key: {
//       ID
//     },
//     UpdateExpression: 'set password = :newPassword',
//     ExpressionAttributeValues: {
//       ':newPassword': hashedPassword
//     }
//   };

//   try {
//     await dbInstance.update(params);
//   } catch (err) {
//     return false;
//   }
// };

// /**
//  * Update the username of a user
//  *
//  * @params ID User's unique identifier
//  * @params username Update the username of the user to this value
//  * @returns false if DynamoDB action fails
//  */
// export const updateUsername = async (
//   ID: string,
//   username: string
// ): Promise<false> => {
//   const params = {
//     TableName: TABLE_NAME_USERS,
//     Key: {
//       ID
//     },
//     UpdateExpression: 'set username = :usernameVal',
//     ExpressionAttributeValues: {
//       ':usernameVal': username
//     }
//   };

//   try {
//     await dbInstance.update(params);
//   } catch (err) {
//     return false;
//   }
// };

// /**
//  * Disable the user
//  *
//  * @params ID User's unique identifier
//  * @returns false if DynamoDB action fails
//  */
// export const disableUser = async (ID: string): Promise<false> => {
//   const params = {
//     TableName: TABLE_NAME_USERS,
//     Key: {
//       ID
//     },
//     UpdateExpression: 'set is_active = :setFalse',
//     ExpressionAttributeValues: {
//       ':setFalse': false
//     }
//   };

//   try {
//     await dbInstance.update(params);
//   } catch (err) {
//     return false;
//   }
// };

// /**
//  * Enable the user
//  *
//  * @params ID User's unique identifier
//  * @returns false if DynamoDB action fails
//  */
// export const enableUser = async (ID: string): Promise<false> => {
//   const params = {
//     TableName: TABLE_NAME_USERS,
//     Key: {
//       ID
//     },
//     UpdateExpression:
//       'set is_active = :setTrue, failed_login_attempts = :resetCount',
//     ExpressionAttributeValues: {
//       ':setTrue': true,
//       // If the user account was blocked due to 10 failed login atempts we need
//       // to reset it's count
//       ':resetCount': 0
//     }
//   };

//   try {
//     await dbInstance.update(params);
//   } catch (err) {
//     return false;
//   }
// };

// /**
//  * Fetch list of users with `next_token` to allow infinite scrolling/fetching.
//  *
//  * @param options To modify the scan operation based on this object.
//  * @returns Array of user with the `next_token` if more users exist in the DB.
//  * @returns false if DynamoDB action fails.
//  */
// export const fetchUsers = async (
//   options: IFetchUsersOptions
// ): Promise<false | IFetchUsersOutput> => {
//   const res = await fetchInfiniteScroll<IUserItem>({
//     TableName: TABLE_NAME_USERS,
//     Limit: options.limit,
//     next_token: options.next_token
//   });

//   if (!res) {
//     return false;
//   }

//   const usersItems = res.Items;

//   const users: IUser[] = usersItems.map((i) => {
//     const user: IUser = {
//       ID: i.ID,
//       avatar: i.avatar,
//       first_name: i.first_name,
//       last_name: i.last_name,
//       username: i.username,
//       email: i.email,
//       country_code: i.country_code,
//       mobile_number: i.mobile_number,
//       wiseup_foundation: i.wiseup_foundation,
//       referral_code: i.referral_code,
//       simplybook_client_id: i.simplybook_client_id,
//       is_active: i.is_active,
//       email_verified: i.email_verified,
//       mobile_number_verified: i.mobile_number_verified
//     };

//     return user;
//   });

//   return {
//     users,
//     next_token: res.next_token
//   };
// };

// export const updateAvatarUrls = async (
//   body: IUpdateAvatarUrlsBody
// ): Promise<false> => {
//   const avatarUrls = {
//     hash: body.hash,
//     small: body.small,
//     medium: body.medium,
//     large: body.large
//   };

//   const params = {
//     TableName: TABLE_NAME_USERS,
//     Key: {
//       ID: body.ID
//     },
//     UpdateExpression: 'set avatar = :avatarUrls',
//     ExpressionAttributeValues: {
//       ':avatarUrls': avatarUrls
//     }
//   };

//   try {
//     await dbInstance.update(params);
//   } catch {
//     return false;
//   }
// };
