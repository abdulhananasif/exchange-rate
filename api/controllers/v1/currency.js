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

const deleteCurrency = (req, res) => {};

const editCurrency = async (req, res) => {};

module.exports = {createCurrency, deleteCurrency, editCurrency};
