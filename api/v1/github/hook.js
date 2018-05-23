const express = require('express');
const crypto = require('crypto');
const { 
    camelCase 
} = require('lodash');
const db = require('../../../db');
const { 
    updateFromEvent
} = require('../../../lib/pull')(db.model('PullRequest'));



/**
 * Used to verify payloads. The HMAC hex digest is computed from the JSON body.
 * If you generate your own digest to test with, ensure that there aren't spaces
 * in the JSON body (e.g. use compact form).
 */
const isValidSignature = (signature, payload, secret) => {
    const hash = crypto.createHmac('sha1', secret).update(payload).digest('hex');

    return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(`sha1=${hash}`));
}

module.exports = [
    /**
     * Search for repository in the list of configured repositories and ensure that the 
     * signature is valid.
     */
    async (req, res, next) => {
        const repo = await mongoose.model('Repository').findOne({ repo_id: req.body.repository.id });

        if (!repo) {
            return next(Error('Repository not configured'));
        }

        const hash = req.get('X-Hub-Signature');

        if (!hash || !isValidSignature(hash, JSON.stringify(req.body), repo.secret)) {
            return next(Error('Could not verify authenticity of request'));
        }

        return next();
    },

    /**
     * Eventually use this as a branch point for different event types.
     * See: https://developer.github.com/v3/activity/events/types/#issuesevent
     */
    async (req, res, next) => {
        const event = camelCase(req.get('X-Github-Event'));

        if (event === 'pull_request') {
            const { pull_request, repository } = req.body;

            try {
                await updateFromEvent(req.body);

                req.app.emit('message', {
                    type: event,
                    pull_id: pull_request.id,
                    action: req.body.action
                });

                return next();
            } catch (err) {
                return next(err);
            }
        }

        return next(new Error('Unsupported event ${event}'));
    }
];
