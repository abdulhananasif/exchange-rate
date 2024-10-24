let {currencies} = require('../../commonVariables');
const { exchangeRateSchema } = require('../../validation/exchangeRate');

const exchangeRateConversion = async (req, res) => {
  let response = {};
  try {
    await exchangeRateSchema.validateAsync(req.query);
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
