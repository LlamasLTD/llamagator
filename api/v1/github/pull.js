const db = require('../../../db');
const { 
    get
} = require('../../../lib/pull')(db.model('PullRequest'));


/**
 * Get a list of pull requests currently sat in the DB. 
 */
module.exports = [
    async (req, res) => {
        const pulls = await get();

        if (!pulls.length) {
            return res.status('404').end();
        }

        return res.json({
            pulls
        });
    }
];