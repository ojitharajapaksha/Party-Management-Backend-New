const Joi = require('joi');

const validateIndividual = Joi.object({
  givenName: Joi.string().required(),
  familyName: Joi.string().required(),
  gender: Joi.string().valid('male', 'female', 'other'),
  birthDate: Joi.date().optional(),
  nationality: Joi.string().optional(),
  maritalStatus: Joi.string().optional(),
  '@type': Joi.string().default('Individual'),
  '@baseType': Joi.string().default('Party'),
});

module.exports = { validateIndividual };
