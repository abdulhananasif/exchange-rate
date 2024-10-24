let {currencies} = require('../../commonVariables');
const { addCurrencySchema, deleteCurrencySchema, editCurrencySchema } = require('../../validation/currency');

const createCurrency = async (req, res) => {
  let response = {};
  try {
    await addCurrencySchema.validateAsync(req.body);
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
  try {
    await deleteCurrencySchema.validateAsync(req.params);
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
  try {
    let isCurrencyUpdated = false;
    await editCurrencySchema.validateAsync(req.body);
    const {currencyCode, newExchangeRate, newCurrencyCode} = req.body;
    currencies = currencies.map((currency) => {
      if (currencyCode === currency.currencyCode) {
        currency.currencyCode = newCurrencyCode
          ? newCurrencyCode
          : currencyCode;
        currency.exchangeRate = newExchangeRate
          ? newExchangeRate
          : currency.exchangeRate;
        isCurrencyUpdated = true;
      }
      return currency;
    });
    if (isCurrencyUpdated) {
      response.status = 200;
      response.json = currencies;
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

module.exports = {createCurrency, deleteCurrency, editCurrency};
