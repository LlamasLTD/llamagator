const mongoose = require('mongoose');


const schema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    repo_id: {
        type: Number,
        required: true
    },
    pull_id: {
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
    created_at: {
        type: Date,
        required: true
    },
    updated_at: {
        type: Date,
        required: true
    },
    closed_at: {
        type: Date
    }
});

schema.index({ pull_id: 1 });

module.exports = mongoose.model('PullRequest', schema);
