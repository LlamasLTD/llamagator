const express = require('express');


module.exports = express.Router()
    .post('/hook', require('./hook'))
    .get('/pull', require('./pull'))
