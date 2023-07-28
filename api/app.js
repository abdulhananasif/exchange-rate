require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const v1 = require('./apiVersions/v1');

const app = express();
app.use(express.json({limit: '99999999999mb'}));
app.use(cors({}));
app.use(bodyParser.urlencoded({extended: true}));

v1.prepareV1Routes(app);

module.exports = app;
