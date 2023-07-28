let {currencies} = require('../../commonVariables');

const exchangeRateConversion = (req, res) => {
  res.status(200).json({currencies});
};

module.exports = {exchangeRateConversion};
