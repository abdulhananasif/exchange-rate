module.exports.prepareV1Routes = (app) => {
  const prefix = '/api/v1/';

  const helpersRouter = require('../routers/v1/helperRouter');
  const currencyRouter = require('../routers/v1/currencyRouter');
  const exchangerateRouter = require('../routers/v1/exchangerateRouter');

  app.use(`${prefix}helper`, helpersRouter);
  app.use(`${prefix}currency`, currencyRouter);
  app.use(`${prefix}exchangerate`, exchangerateRouter);
};
