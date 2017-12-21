const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');


const app = express();

/* Middleware */
app.use(helmet());
app.use(bodyParser.json());

/* Routes */
app.use('/v1/github', require('./api/v1/github'));

module.exports = app;