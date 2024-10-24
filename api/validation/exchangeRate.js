const Joi = require('joi');

const exchangeRateSchema = Joi.object({
  currencyCode: Joi.string().required().messages({
    'string.base': 'Currency code must be a string',
    'any.required': 'Currency code is required',
  }),
  amount: Joi.number().required().messages({
    'number.base': 'Amount must be a number',
    'any.required': 'Amount is required',
  }),
});

module.exports={exchangeRateSchema}