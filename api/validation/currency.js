const Joi = require('joi');

const addCurrencySchema = Joi.object({
  currencyCode: Joi.string().required().messages({
    'string.base': 'Currency code must be a string',
    'any.required': 'Currency code is required',
  }),
  exchangeRate: Joi.number().required().messages({
    'number.base': 'Exchange Rate must be a number',
    'any.required': 'Exchange Rate is required',
  }),
});

const deleteCurrencySchema = Joi.object({
  currencyCode: Joi.string().required().messages({
    'string.base': 'Currency code must be a string',
    'any.required': 'Currency code is required',
  }),
});

const editCurrencySchema = Joi.object({
  currencyCode: Joi.string().required().messages({
    'string.base': 'Currency code must be a string',
    'any.required': 'Currency code is required',
  }),
  newExchangeRate: Joi.number().messages({
    'number.base': 'New exchange Rate must be a number',
    'any.required': 'New exchange Rate is required',
  }),
  newCurrencyCode: Joi.string().messages({
    'string.base': 'New currency code must be a string',
    'any.required': 'New currency code is required',
  }),
})
  .or('newCurrencyCode', 'newExchangeRate')
  .messages({
    'object.missing':
      'At least one of newCurrencyCode or newExchangeRate is required with currencyCode',
  });

module.exports = {addCurrencySchema, deleteCurrencySchema, editCurrencySchema};
