const mongoose = require('mongoose');


const schema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    id: {
        type: Number,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    },
    updatedAt: {
        type: Date,
        required: true
    },
    closedAt: {
        type: Date
    }
});

module.exports = mongoose.model('PullRequest', schema);
