import Joi from 'joi';

//===================================== Definitions pretaining to attractions

export const locationSchema = Joi.object({
  latitude: Joi.string().required(),
  longitude: Joi.string().required()
});

export const attractionSchema = Joi.object({
  location: locationSchema.required(),
  name: Joi.string().required(),
  guides: Joi.array().items(Joi.string()),
  avatar: Joi.string(), // render on the map
  images: Joi.array().items(Joi.string().required())
});

//=====================================
