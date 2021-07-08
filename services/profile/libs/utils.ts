import * as bcrypt from 'bcryptjs';

/**
 * Take a normal password string and hash it before saving to DB.
 *
 * @param password Password to be hashed.
 * @returns Hashed password string.
 */
export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);

  // Encrypt the password.
  const passwordEncrypted = await bcrypt.hash(password, salt);

  return passwordEncrypted;
};

/**
 * @param passwordFromDb Hash password that was in the DB.
 * @param passwordFromUser Password that user provied in the Request Body.
 *
 * @returns true If user's credentials are authenticated.
 * @returns false if user's credentials are not authenticated.
 */

export const authenticateUserCredentials = async (
  passwordFromDb: string,
  passwordFromUser: string
): Promise<boolean> => {
  let passwordIsValid = false;

  // Compare both the passwords. If they are same, bcrypt returns true.
  passwordIsValid = await bcrypt.compare(passwordFromUser, passwordFromDb);

  return passwordIsValid;
};
