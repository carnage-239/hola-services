import Joi from 'joi';

export const createGuideSchema = Joi.object({
  fullName: Joi.string().required(),
  email: Joi.string().required(),
  mobileNumber: Joi.string().required()
  // panNumber: Joi.string().required(),
  // reEnterPanNumber: Joi.any()
  //   .equal(Joi.ref('panNumber'))
  //   .required()
  //   .label('Confirm panNumber')
  //   .messages({ 'any.only': '{{#label}} does not match' }),
  // panCardImageLink: Joi.string().required(),
  // aadharNumber: Joi.string().required(),
  // reEnterAadharNumber: Joi.any()
  //   .equal(Joi.ref('aadharNumber'))
  //   .required()
  //   .label('Confirm aadharNumber')
  //   .messages({ 'any.only': '{{#label}} does not match' }),
  // frontAadharImageLink: Joi.string().required(),
  // backAadharImageLink: Joi.string().required(),
  // tourGuideLicenseImageLink: Joi.string().required()
});

export const guideVerficationSchema = Joi.object({
  panNumber: Joi.string().required(),
  reEnterPanNumber: Joi.any()
    .equal(Joi.ref('panNumber'))
    .required()
    .label('Confirm panNumber')
    .messages({ 'any.only': '{{#label}} does not match' }),
  panCardImageLink: Joi.string().required(),
  aadharNumber: Joi.string().required(),
  reEnterAadharNumber: Joi.any()
    .equal(Joi.ref('aadharNumber'))
    .required()
    .label('Confirm aadharNumber')
    .messages({ 'any.only': '{{#label}} does not match' }),
  frontAadharImageLink: Joi.string().required(),
  backAadharImageLink: Joi.string().required(),
  tourGuideLicenseImageLink: Joi.string().required()
});

export const photoPresignedUrl = Joi.object({
  contentType: Joi.string()
    .required()
    .valid('image/png', 'image/jpg', 'image/jpeg'),
  format: Joi.string().required().valid('jpg', 'png', 'jpeg')
});

export const guideProfileData = Joi.object({
  languagesSpoken: Joi.array().items(Joi.string().required()).required(),
  areaOfOperation: Joi.array().items(Joi.string().required()).required(),
  attractions: Joi.array().items(Joi.string().required()).required()
});
