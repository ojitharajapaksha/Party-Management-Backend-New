const Joi = require('joi');

const validateOrganization = Joi.object({
  name: Joi.string().required(),
  tradingName: Joi.string().optional(),
  organizationType: Joi.string().optional(),
  isLegalEntity: Joi.boolean().optional(),
  isHeadOffice: Joi.boolean().optional(),
  status: Joi.string().optional(),
  '@type': Joi.string().default('Organization'),
  '@baseType': Joi.string().default('Party'),
});

module.exports = { validateOrganization };
