const express = require('express');
const crypto = require('crypto');
const mongoose = require('mongoose');
const { camelCase } = require('lodash');

/* Mongoose models */
require('../../../models');


function isValidSignature(signature, payload, secret) {
    const hash = crypto.createHmac('sha1', secret).update(payload).digest('hex');

    return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(`sha1=${hash}`));
}

module.exports = [
    /**
     * Handle any invalid calls made to the webhook endpoint.
     */
    (req, res, next) => {
        const hash = req.get('X-Hub-Signature');
        
        if (hash && isValidSignature(hash, JSON.stringify(req.body), process.env.GH_SECRET)) {
            return next();
        }

        return res.status(401).send();
    },

    /**
     * Perform an update/insert based on the givel url of the PR.
     */
    async (req, res, next) => {
        const event = camelCase(req.get('X-Github-Event'));
      
        if (!event) {
            throw new Error('Event name not provided');
        }

        const { url, title, created_at, updated_at, closed_at } = req.body.pull_request;
        const { login } = req.body.pull_request.user;

        try {
            let changes = {};
    
            if (req.body.action === 'closed') {
                changes = { 
                    state: req.body.action,
                    closedAt: closed_at
                };
            } else {
                changes = {
                    url,
                    title,
                    state: req.body.action,
                    createdBy: login,
                    createdAt: created_at,
                    updatedAt: updated_at
                };
            }
    
            const doc = await mongoose.model('PullRequest').findOneAndUpdate({ url }, changes, { upsert: true });

            req.app.emit('message', {
                type: event,
                url,
                action: req.body.action
            });
        } catch (err) {
            console.log(err);
        }

        res.end();
    }
];
