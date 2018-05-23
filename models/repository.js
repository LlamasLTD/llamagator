const mongoose = require('mongoose');


const schema = mongoose.Schema({
    repo_id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    secret: {
        type: String,
        required: true
    }
});

schema.index({ createdAt: 1, repo: 1 });

module.exports = mongoose.model('Repository', schema);