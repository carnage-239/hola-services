import * as jwt from 'jsonwebtoken';

import {
  ACCESS_TOKEN_SECRET,
  ADMIN_ACCESS_TOKEN_SECRET,
  ADMIN_REFRESH_TOKEN_SECRET,
  BUSINESS_ACCOUNT_ACCESS_TOKEN_SECRET,
  BUSINESS_ACCOUNT_REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET
} from '../config';

const userAccessTokenOpts = {
  expiresIn: '3h',
  issuer: 'IndyWise'
};

const adminAccessTokenOpts = {
  expiresIn: '3h',
  issuer: 'IndyWise'
};

const businessAccountAccessTokenOpts = {
  expiresIn: '3h',
  issuer: 'IndyWise'
};

const userRefreshTokenOpts = {
  expiresIn: '30d',
  issuer: 'IndyWise'
};

const adminRefreshTokenOpts = {
  expiresIn: '8h',
  issuer: 'IndyWise'
};

const businessAccountRefreshTokenOpts = {
  expiresIn: '30d',
  issuer: 'IndyWise'
};

const encode = async (
  payload: Record<string, unknown>,
  secret: string,
  options: jwt.SignOptions
): Promise<string> => {
  return jwt.sign(payload, secret, options);
};

const decode = async <T>(token: string, secret: string): Promise<T> => {
  return jwt.verify(token, secret) as unknown as T;
};

const encodeAccessJWT = (payload: Record<string, unknown>) => {
  return encode(payload, ACCESS_TOKEN_SECRET, userAccessTokenOpts);
};

const encodeAdminAccessJWT = (payload: Record<string, unknown>) => {
  return encode(payload, ADMIN_ACCESS_TOKEN_SECRET, adminAccessTokenOpts);
};

const encodeBusinessAccountAccessJWT = (payload: Record<string, unknown>) => {
  return encode(
    payload,
    BUSINESS_ACCOUNT_ACCESS_TOKEN_SECRET,
    businessAccountAccessTokenOpts
  );
};

const encodeRefreshJWT = (payload: Record<string, unknown>) => {
  return encode(payload, REFRESH_TOKEN_SECRET, userRefreshTokenOpts);
};

const encodeAdminRefreshJWT = (payload: Record<string, unknown>) => {
  return encode(payload, ADMIN_REFRESH_TOKEN_SECRET, adminRefreshTokenOpts);
};

const encodeBusinessAccountRefreshJWT = (payload: Record<string, unknown>) => {
  return encode(
    payload,
    BUSINESS_ACCOUNT_REFRESH_TOKEN_SECRET,
    businessAccountRefreshTokenOpts
  );
};

const decodeAccessJWT = async <T>(token: string): Promise<T> => {
  return decode(token, ACCESS_TOKEN_SECRET);
};

const decodeAdminAccessJWT = async <T>(token: string): Promise<T> => {
  return decode(token, ADMIN_ACCESS_TOKEN_SECRET);
};

const decodeBusinessAccountAccessJWT = async <T>(token: string): Promise<T> => {
  return decode(token, BUSINESS_ACCOUNT_ACCESS_TOKEN_SECRET);
};

const decodeRefreshJWT = async <T>(token: string): Promise<T> => {
  return decode(token, REFRESH_TOKEN_SECRET);
};

const decodeAdminRefreshJWT = async <T>(token: string): Promise<T> => {
  return decode(token, ADMIN_REFRESH_TOKEN_SECRET);
};

const decodeBusinessAccountRefreshJWT = async <T>(
  token: string
): Promise<T> => {
  return decode(token, BUSINESS_ACCOUNT_REFRESH_TOKEN_SECRET);
};

export default {
  encode,
  decode,
  encodeAccessJWT,
  encodeAdminAccessJWT,
  encodeBusinessAccountAccessJWT,
  decodeAccessJWT,
  decodeAdminAccessJWT,
  decodeBusinessAccountAccessJWT,
  encodeRefreshJWT,
  encodeAdminRefreshJWT,
  encodeBusinessAccountRefreshJWT,
  decodeRefreshJWT,
  decodeAdminRefreshJWT,
  decodeBusinessAccountRefreshJWT
};
