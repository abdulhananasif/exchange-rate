let {currencies} = require('../../commonVariables');

const createCurrency = (req, res) => {
  currencies.push({currencyCode: 'USD', exchangeRate: 305});
};

const deleteCurrency = (req, res) => {};

const editCurrency = (req, res) => {};

module.exports = {createCurrency, deleteCurrency, editCurrency};
