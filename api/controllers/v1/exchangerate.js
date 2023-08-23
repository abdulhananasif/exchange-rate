const Joi = require('joi');

let {currencies} = require('../../commonVariables');

const exchangeRateConversion = async (req, res) => {
  let response = {};
  const schema = Joi.object({
    currencyCode: Joi.string().required().messages({
      'string.base': 'Currency code must be a string',
      'any.required': 'Currency code is required',
    }),
    amount: Joi.number().required().messages({
      'number.base': 'Amount must be a number',
      'any.required': 'Amount is required',
    }),
  });
  try {
    await schema.validateAsync(req.query);
    const {currencyCode, amount} = req.query;
    const foundcurrency = currencies.find(
      (curency) => curency.currencyCode === currencyCode
    );
    if (foundcurrency) {
      const amountInPKR = amount * foundcurrency.exchangeRate;
      response.status = 200;
      response.json = {amountInPKR};
    } else {
      throw {message: 'Currency not found'};
    }
  } catch (err) {
    let errorMessage = '';
    if (err.message) {
      errorMessage = err.message;
    } else {
      err.details.forEach((error) => {
        errorMessage += error.message;
      });
    }
    response.status = 400;
    response.json = {errorMessage};
  }
  res.status(response.status).json(response.json);
};

module.exports = {exchangeRateConversion};
