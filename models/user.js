const mongoose = require('mongoose');


const schema = mongoose.Schema({
    login: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('User', schema);