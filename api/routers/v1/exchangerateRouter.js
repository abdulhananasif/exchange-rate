const express = require('express');
const bodyParser = require('body-parser');
const {exchangeRateConversion} = require('../../controllers/v1/exchangerate');

const exchangerateRouter = express.Router();
exchangerateRouter.use(bodyParser.json());

exchangerateRouter.route('/').get(exchangeRateConversion);

module.exports = exchangerateRouter;
