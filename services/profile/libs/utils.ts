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
