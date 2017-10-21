const mongoose = require('mongoose');


const repositorySchema = mongoose.Schema({
    repo: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    }
});

repositorySchema.index({ createdAt: 1, repo: 1 });

module.exports = mongoose.model('Repository', repositorySchema);