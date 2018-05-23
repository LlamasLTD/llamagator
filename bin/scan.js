const github = require('octonode');
const { 
    flatten, 
    map 
} = require('lodash');

const db = require('../db');

const { 
    sync, 
    get,
} = require('../lib/pull')(db.model('PullRequest'));


const getPullRequestsForRepo = (client, repo) => 
    new Promise((resolve, reject) => 
        client.repo(repo.url).prs((err, prs) => {
            return err ? reject(err) : resolve(prs);
        })
    );

const syncWithGithub = async (model) => {
    const repos = await model.find();

    if (!repos.length) {
        throw new Error('No repositories configured');
    }

    try {
        const prs = await Promise.all(
            map(repos, repo => 
                getPullRequestsForRepo(github.client(process.env.GH_ACCESS_KEY), repo)
            )
        );

        return sync(flatten(prs));
    } catch (err) {
        console.log(err);
    }
};

syncWithGithub(db.model('Repository')).then((res) => {
    console.info('Synchronised with github');

    process.exit(0);
});