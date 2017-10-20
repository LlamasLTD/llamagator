const express = require('express');
const crypto = require('crypto');


function isValidSignature(signature, payload, secret) {
    const hash = crypto.createHmac('sha1', secret).update(payload).digest('hex');

    return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(`sha1=${hash}`));
}

module.exports = express.Router()
    .post('/', 
    (req, res, next) => {
        const hash = req.get('X-Hub-Signature');
        
        if (hash && isValidSignature(hash, JSON.stringify(req.body), process.env.GH_SECRET)) {
            return next();
        }

        return res.status(401).send();
    },
    (req, res, next) => {
        console.log(res.body);
    })
;
