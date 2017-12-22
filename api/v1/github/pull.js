/**
 * Get a list of pull requests currently sat in the DB. 
 */
module.exports = [
    (req, res) => {
        return res.json({
            pulls: []
        });
    }
];