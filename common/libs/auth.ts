import { IUserItem } from '../../services/profile/interfaces';
import JWT from '../utils/jwt';

export enum TokenType {
  AccessToken = 'accessToken',
  RefreshToken = 'refreshToken'
}

// The tokens are to be created for a given `Admin`.
export interface IAdmin {
  username: string;
  password: string;
  name: string;
  roles: string[];
  isActive: boolean;
  jwtVersion: number;
  created_at: number;
  updated_at: number;
  last_login: number;
}

// The tokens are to be created for a given `Business Account`.
export interface IBusinessAccount {
  organization_name: string;
  email: string;
  username: string;
  password: string;
  isActive: boolean;
  jwtVersion: number;
  created_at: number;
  updated_at: number;
  last_login: number;
}

export interface User {
  id: string;
  simplybook_client_id?: string;
  user_type: string[];
  email: string;
  mobile: string;
  isActive: boolean;
  jwtVersion: number;
}

export interface Admin {
  username: string;
  name: string;
  roles: string[];
  isActive: boolean;
  jwtVersion: number;
}

export interface BusinessAccount {
  organization_name: string;
  email: string;
  username: string;
  password: string;
  isActive: boolean;
  jwtVersion: number;
}

interface UserTokenPayload {
  token_type: TokenType;
  user: User;
}

interface AdminTokenPayload {
  token_type: TokenType;
  admin: Admin;
}

export interface BusinessAccountTokenPayload {
  token_type: TokenType;
  business_account: BusinessAccount;
}

/**
 * @param user The user for which the access JWT token is to be generated.
 * @return JWT access token.
 */
const generateAccessToken = async (user: IUserItem): Promise<string> => {
  return await JWT.encodeAccessJWT({
    token_type: TokenType.AccessToken,
    user: {
      id: user.ID,
      email: user.email,
      mobileNumber: user.mobileNumber,
      isActive: user.isActive,
      jwtVersion: user.jwtVersion
    }
  });
};

/**
 * @param admin The admin for which the access JWT token is to be generated.
 * @return JWT access token.
 */
const generateAdminAccessToken = async (admin: IAdmin): Promise<string> => {
  return await JWT.encodeAdminAccessJWT({
    token_type: TokenType.AccessToken,
    admin: {
      username: admin.username,
      name: admin.name,
      roles: admin.roles,
      isActive: admin.isActive,
      jwtVersion: admin.jwtVersion
    }
  });
};

/**
 * @param account The business account for which the access JWT token is to be
 * generated.
 * @return JWT access token.
 */
const generateBusinessAccountAccessToken = async (
  account: IBusinessAccount
): Promise<string> => {
  return await JWT.encodeBusinessAccountAccessJWT({
    token_type: TokenType.AccessToken,
    business_account: {
      organization_name: account.organization_name,
      username: account.username,
      email: account.email,
      isActive: account.isActive,
      jwtVersion: account.jwtVersion
    }
  });
};

/**
 * @param user The user for which the refresh JWT token is to be generated.
 * @return JWT refresh token.
 */
const generateRefreshToken = async (user: IUserItem): Promise<string> => {
  return await JWT.encodeRefreshJWT({
    token_type: TokenType.RefreshToken,
    user: {
      id: user.ID,
      email: user.email,
      mobileNumber: user.mobileNumber,
      isActive: user.isActive,
      jwtVersion: user.jwtVersion
    }
  });
};

/**
 * @param admin The admin for which the refresh JWT token is to be generated.
 * @return JWT access token.
 */
const generateAdminRefreshToken = async (admin: IAdmin): Promise<string> => {
  return await JWT.encodeAdminRefreshJWT({
    token_type: TokenType.RefreshToken,
    admin: {
      username: admin.username,
      name: admin.name,
      roles: admin.roles,
      isActive: admin.isActive,
      jwtVersion: admin.jwtVersion
    }
  });
};

/**
 * @param account The business account for which the refresh JWT token is to be
 * generated.
 * @return JWT refresh token.
 */
const generateBusinessAccountRefreshToken = async (
  account: IBusinessAccount
): Promise<string> => {
  return await JWT.encodeBusinessAccountRefreshJWT({
    token_type: TokenType.RefreshToken,
    business_account: {
      organization_name: account.organization_name,
      username: account.username,
      email: account.email,
      isActive: account.isActive,
      jwtVersion: account.jwtVersion
    }
  });
};

/**
 * @param token JWT access token.
 * @returns Token's payload if the token is valid.
 * @returns Null if the token in invalid / tempered.
 * @returns false if the token signature is valid but expired.
 */
const parseAccessToken = async (
  token: string
): Promise<UserTokenPayload | null | false> => {
  try {
    const decoded = await JWT.decodeAccessJWT<UserTokenPayload>(token);

    if (!decoded) return null;
    if (decoded.token_type !== TokenType.AccessToken) return null;

    return decoded;
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return false;
    }

    return null;
  }
};

/**
 * @param token JWT access token.
 * @returns Token's payload if the token is valid.
 * @returns Null if the token in invalid.
 * @returns false if the token signature is valid but expired.
 */
const parseAdminAccessToken = async (
  token: string
): Promise<AdminTokenPayload | null | false> => {
  try {
    const decoded = await JWT.decodeAdminAccessJWT<AdminTokenPayload>(token);

    if (!decoded) return null;
    if (decoded.token_type !== TokenType.AccessToken) return null;

    return decoded;
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return false;
    }

    return null;
  }
};

/**
 * @param token JWT access token.
 * @returns Token's payload if the token is valid.
 * @returns Null if the token in invalid.
 * @returns false if the token signature is valid but expired.
 */
const parseBusinessAccountAccessToken = async (
  token: string
): Promise<BusinessAccountTokenPayload | null | false> => {
  try {
    const decoded =
      await JWT.decodeBusinessAccountAccessJWT<BusinessAccountTokenPayload>(
        token
      );

    if (!decoded) return null;
    if (decoded.token_type !== TokenType.AccessToken) return null;

    return decoded;
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return false;
    }

    return null;
  }
};

/**
 * @param token JWT refresh token.
 * @returns Token's payload if the token is valid.
 * @returns Null if the token in invalid.
 */
const parseRefreshToken = async (
  token: string
): Promise<UserTokenPayload | null> => {
  try {
    const decoded = await JWT.decodeRefreshJWT<UserTokenPayload>(token);

    if (!decoded) return null;
    if (decoded.token_type !== TokenType.RefreshToken) return null;

    return decoded;
  } catch {
    return null;
  }
};

/**
 * @param token JWT refresh token.
 * @returns Token's payload if the token is valid.
 * @returns Null if the token in invalid.
 */
const parseAdminRefreshToken = async (
  token: string
): Promise<AdminTokenPayload | null> => {
  try {
    const decoded = await JWT.decodeAdminRefreshJWT<AdminTokenPayload>(token);

    if (!decoded) return null;
    if (decoded.token_type !== TokenType.RefreshToken) return null;

    return decoded;
  } catch {
    return null;
  }
};

/**
 * @param token JWT access token.
 * @returns Token's payload if the token is valid.
 * @returns Null if the token in invalid.
 * @returns false if the token signature is valid but expired.
 */
const parseBusinessAccountRefreshToken = async (
  token: string
): Promise<BusinessAccountTokenPayload | null> => {
  try {
    const decoded =
      await JWT.decodeBusinessAccountRefreshJWT<BusinessAccountTokenPayload>(
        token
      );

    if (!decoded) return null;
    if (decoded.token_type !== TokenType.RefreshToken) return null;

    return decoded;
  } catch (err) {
    return null;
  }
};

/**
 * @param user The user for which the JWT tokens is to be generated.
 * @returns JWT access & refresh tokens.
 */
const generateTokens = async (user: IUserItem): Promise<[string, string]> => {
  const accessToken = await generateAccessToken(user);
  const refreshToken = await generateRefreshToken(user);

  return [accessToken, refreshToken];
};

/**
 * @param admin The admin for which the JWT tokens is to be generated.
 * @returns JWT access & refresh tokens.
 */
const generateAdminTokens = async (
  admin: IAdmin
): Promise<[string, string]> => {
  const accessToken = await generateAdminAccessToken(admin);
  const refreshToken = await generateAdminRefreshToken(admin);

  return [accessToken, refreshToken];
};

/**
 * @param account The busines account for which the JWT tokens is to be generated.
 * @returns JWT access & refresh tokens.
 */
const generateBusinessAccountTokens = async (
  account: IBusinessAccount
): Promise<[string, string]> => {
  const accessToken = await generateBusinessAccountAccessToken(account);
  const refreshToken = await generateBusinessAccountRefreshToken(account);

  return [accessToken, refreshToken];
};

/**
 * @param token JWT access token.
 * @returns User's ID that was in the payload of the given `token`.
 */
const getUserIdFromToken = async (
  token: string
): Promise<string | null | false> => {
  const decodedJWT = await parseAccessToken(token);

  if (decodedJWT === null) {
    return null;
  }

  if (decodedJWT === false) {
    return false;
  }

  return decodedJWT.user.id;
};

/**
 * @param token JWT access token.
 * @returns User's type that was in the payload of the given `token`.
 */
const getUserTypeFromToken = async (token: string): Promise<string[]> => {
  const decodedJWT = await parseAccessToken(token);

  if (decodedJWT === null || decodedJWT === false) {
    return null;
  }

  return decodedJWT.user.user_type;
};

/**
 * @param token JWT access token.
 * @returns User's email that was in the payload of the given `token`.
 */
const getUserEmailFromToken = async (token: string): Promise<string> => {
  const decodedJWT = await parseAccessToken(token);

  if (decodedJWT === null || decodedJWT === false) {
    return null;
  }

  return decodedJWT.user.email;
};

/**
 * @param token JWT access token.
 * @returns User's mobileNumber that was in the payload of the given `token`.
 */
const getMobileNumberFromToken = async (token: string): Promise<string> => {
  const decodedJWT = await parseAccessToken(token);

  if (decodedJWT === null || decodedJWT === false) {
    return null;
  }

  return decodedJWT.user.mobile;
};

/**
 * @param token JWT access token.
 * @returns Admin's roles that was in the payload of the given `token`.
 */
const getAdminRolesFromToken = async (
  token: string
): Promise<string[] | null> => {
  const decodedJWT = await parseAdminAccessToken(token);

  if (decodedJWT === null || decodedJWT === false) {
    return null;
  }

  return decodedJWT.admin.roles;
};

/**
 * @param token JWT access token.
 * @returns Admin's username that was in the payload of the given `token`.
 */
const getAdminUsernameFromToken = async (
  token: string
): Promise<string | null> => {
  const decodedJWT = await parseAdminAccessToken(token);

  if (decodedJWT === null || decodedJWT === false) {
    return null;
  }

  return decodedJWT.admin.username;
};

/**
 * @param event AWS lambda event object.
 * @returns JWT access token from the headers present in the `event`.
 */
const getAccessTokenFromHeaders = (event): string => {
  const token = event.headers['Authorization'].split(' ')[1];
  return token;
};

/**
 * @param allow - It is `true` if authorizer wants to allow the access to the
 * resource(API end point) and it is `false` if the authorizer wants to deny the access.
 * @returns Policy to allow or deny the access.
 */
const generatePolicy = (allow: boolean) => {
  return {
    principalId: 'token',
    policyDocument: {
      Version: '2012-10-17',
      Statement: {
        Action: 'execute-api:Invoke',
        Effect: allow ? 'Allow' : 'Deny',
        Resource: '*'
      }
    }
  };
};

export default {
  generateTokens,
  generateAdminTokens,
  generateBusinessAccountTokens,
  parseAccessToken,
  parseAdminAccessToken,
  parseBusinessAccountAccessToken,
  parseRefreshToken,
  parseAdminRefreshToken,
  parseBusinessAccountRefreshToken,
  getUserIdFromToken,
  getUserTypeFromToken,
  getUserEmailFromToken,
  getAdminRolesFromToken,
  getAdminUsernameFromToken,
  getAccessTokenFromHeaders,
  generatePolicy,
  getMobileNumberFromToken
};
