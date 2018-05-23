const { map, pick } = require('lodash');


const updateFromEvent = (model, payload) => {
    const pr = payload.pull_request;

    const changes = {
        ...pick(payload, [
            'url', 
            'title', 
            'created_at', 
            'updated_at', 
            'closed_at', 
            'state'
        ]),
        pull_id: pr.id,
        created_by: pr.user.login,
        repo_id: pr.repository.id
    };

    return model.findOneAndUpdate({ pull_id: changes.repo_id }, changes, { upsert: true });    
};

const updateFromFetch = (model, payload) => {
    const changes = {
        ...pick(payload, [
            'title', 
            'created_at', 
            'updated_at', 
            'closed_at', 
            'state'
        ]),
        url: payload.html_url,
        created_by: payload.user.login,
        repo_id: payload.head.repo.id,
        pull_id: payload.id
    };

    return model.findOneAndUpdate({ pull_id: changes.repo_id }, changes, { upsert: true });
};

const sync = model => prs => {
    return Promise.all(
        map(prs, pr => updateFromFetch(model, pr))
    ).catch((err) => {
        console.log(err);  
    });
};

const get = model => () => {
    return model.find({}, { '_id': 0, '__v': 0 });
};

module.exports = (model) => ({
    updateFromEvent,
    sync: sync(model),
    get: get(model)
})