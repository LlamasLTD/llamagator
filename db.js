const mongoose = require('mongoose');

/* Bring in models */
require('./models');

const { 
    MONGO_USER, 
    MONGO_PASS, 
    MONGO_HOST, 
    MONGO_DATA 
} = process.env;

const uri = `mongodb://${MONGO_USER}:${MONGO_PASS}@${MONGO_HOST}/${MONGO_DATA}?authSource=admin`; 

mongoose.Promise = global.Promise;

if (process.env.NODE_ENV === 'debug') {
    mongoose.set('debug', true);
}

module.exports = mongoose.connect(uri, { 
    useMongoClient: true 
});