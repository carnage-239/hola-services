import Joi from 'joi';

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
