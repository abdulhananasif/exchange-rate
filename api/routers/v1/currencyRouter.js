const express = require('express');
const bodyParser = require('body-parser');
const {
  createCurrency,
  editCurrency,
  deleteCurrency,
} = require('../../controllers/v1/currency');

const currencyRouter = express.Router();
currencyRouter.use(bodyParser.json());

currencyRouter.route('/add').post(createCurrency);
currencyRouter.route('/edit').put(editCurrency);
currencyRouter.route('/delete').delete(deleteCurrency);

module.exports = currencyRouter;
