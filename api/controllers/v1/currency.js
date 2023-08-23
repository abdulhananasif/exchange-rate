const Joi = require('joi');

let {currencies} = require('../../commonVariables');

const createCurrency = async (req, res) => {
  let response = {};
  const schema = Joi.object({
    currencyCode: Joi.string().required().messages({
      'string.base': 'Currency code must be a string',
      'any.required': 'Currency code is required',
    }),
    exchangeRate: Joi.number().required().messages({
      'number.base': 'Exchange Rate must be a number',
      'any.required': 'Exchange Rate is required',
    }),
  });
  try {
    await schema.validateAsync(req.body);
    const {currencyCode, exchangeRate} = req.body;
    currencies.push({currencyCode, exchangeRate});
    response.status = 201;
    response.json = {currencies};
  } catch (err) {
    let errorMessage = '';
    err.details.forEach((error) => {
      errorMessage += error.message;
    });
    response.status = 400;
    response.json = {errorMessage};
  }
  res.status(response.status).json(response.json);
};

const deleteCurrency = async (req, res) => {
  let response = {};
  const schema = Joi.object({
    currencyCode: Joi.string().required().messages({
      'string.base': 'Currency code must be a string',
      'any.required': 'Currency code is required',
    }),
  });
  try {
    await schema.validateAsync(req.params);
    const {currencyCode} = req.params;
    currencies = currencies.filter(
      (currency) => currencyCode !== currency.currencyCode
    );
    response.status = 200;
    response.json = {message: 'Currency deleted successsfully'};
  } catch (err) {
    let errorMessage = '';
    err.details.forEach((error) => {
      errorMessage += error.message;
    });
    response.status = 400;
    response.json = {errorMessage};
  }
  res.status(response.status).json(response.json);
};

const editCurrency = async (req, res) => {
  let response = {};
  const schema = Joi.object({
    currencyCode: Joi.string().required().messages({
      'string.base': 'Currency code must be a string',
      'any.required': 'Currency code is required',
    }),
    newExchangeRate: Joi.number().required().messages({
      'number.base': 'New exchange Rate must be a number',
      'any.required': 'New exchange Rate is required',
    }),
    newCurrencyCode: Joi.string().messages({
      'string.base': 'New currency code must be a string',
      'any.required': 'New currency code is required',
    }),
  });
  try {
    await schema.validateAsync(req.body);
    const {currencyCode, newExchangeRate, newCurrencyCode} = req.body;
    currencies = currencies.map((currency) => {
      if (currencyCode === currency.currencyCode) {
        currency.currencyCode = newCurrencyCode
          ? newCurrencyCode
          : currencyCode;
        currency.exchangeRate = newExchangeRate;
      }
      return currency;
    });

    response.status = 200;
    response.json = currencies;
  } catch (err) {
    let errorMessage = '';
    err.details.forEach((error) => {
      errorMessage += error.message;
    });
    response.status = 400;
    response.json = {errorMessage};
  }
  res.status(response.status).json(response.json);
};

module.exports = {createCurrency, deleteCurrency, editCurrency};
