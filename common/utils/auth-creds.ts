import * as bcrypt from 'bcryptjs';

/**
 * @param passwordFromDb Hash password that was in the DB.
 * @param passwordFromReqBody Password that user provied in the Request Body.
 * @returns true If user's credentials are authenticated.
 * @returns false if user's credentials are not authenticated.
 */
export const authenticateCredentials = async (
  passwordFromDb: string,
  passwordFromReqBody: string
): Promise<true | false> => {
  let passwordIsValid = false;

  // Compare both the passwords. If they are same, bcrypt returns true.
  passwordIsValid = await bcrypt.compare(passwordFromReqBody, passwordFromDb);

  return passwordIsValid;
};
