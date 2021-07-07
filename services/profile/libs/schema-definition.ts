import Joi from 'joi';

import {
  mobileRegEx,
  passwordRegEx,
  usernameRegEx
} from '../../../common/utils/regex';

export const createUser = Joi.object({
  email: Joi.string().email().required(),
  username: Joi.string().regex(usernameRegEx).required(),
  password: Joi.string().regex(passwordRegEx).required(),
  countryCode: Joi.string().required(),
  mobileNumber: Joi.string().regex(mobileRegEx).required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required()
});

export const login = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required()
});

export const refreshTokensBodySchema = Joi.object({
  refresh_token: Joi.string().required()
}).required();

export const resetPassword = Joi.object({
  token: Joi.string().required(),
  new_password: Joi.string().regex(passwordRegEx).required()
});

export const updateEmail = Joi.object({
  email: Joi.string().email().required()
});

export const updateMobileNumber = Joi.object({
  country_code: Joi.string().required(),
  mobile_number: Joi.string().regex(mobileRegEx).required()
});

export const updatePassword = Joi.object({
  current_password: Joi.string().required(),
  new_password: Joi.string().regex(passwordRegEx).required(),
  confirm_password: Joi.string().required()
});

export const updateAvatarUrls = Joi.object({
  ID: Joi.string().required(),
  hash: Joi.string().allow(null).required(),
  small: Joi.string().allow(null).required(),
  medium: Joi.string().allow(null).required(),
  large: Joi.string().allow(null).required()
});

export const updateUsername = Joi.object({
  username: Joi.string().regex(usernameRegEx).required()
});
