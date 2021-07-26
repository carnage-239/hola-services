import Joi from 'joi';

export const querySchema = Joi.object({
  coordinates: Joi.object({
    latitude: Joi.number().required(),
    longitude: Joi.number().required()
  }).required(),
  radius: Joi.number().required()
});
