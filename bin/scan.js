const github = require('octonode');
const { groupBy, map } = require('lodash');


const getPullRequestsForRepo = (client, cb) => url =>
    client.repo(url).prs((err, prs) => 
        cb(groupBy(prs, (pr) => pr.head.repo.name))
    );

const repos = [
    'mylifedigital/permissions-ui',
    'mylifedigital/permission-statement-service'
].map(
    getPullRequestsForRepo(
        github.client(process.env.GH_ACCESS_KEY),
        (prs) => {

        }
    )
);


