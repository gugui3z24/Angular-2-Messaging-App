const middleware = require('../../middleware/authentication');
const validator = require('./draft-validation');
const cache = require('../../../config/cache');
const DraftDAO = require('./draft-dao').DraftDAO;
const Message = require('../message/message-entity').Message;

module.exports = (router, config) => {
    router.get('/', middleware, cache.cacheable(cache.cacheKeys.DRAFTS), (req, res) => {
        const dao = new DraftDAO(config);
        dao.getAllDrafts(req.decoded.user.id)
            .then((results) => {
                res.status(200).json({ messages: results });
            })
            .catch((error) => {
                res.status(error.code).json(error.msg);
            });
    });

    router.get('/:id', middleware, (req, res) => {
        const results = validator.get(req);
        if (!results.valid) {
            res.status(400).json({ message: results.message });
        } else {
            const dao = new DraftDAO(config);
            dao.getDraft(req.decoded.user.id, req.params.id)
                .then((results) => {
                    res.status(200).json({ message: results });
                })
                .catch((error) => {
                    res.status(error.code).json(error.msg);
                });
        }
    });

    router.post('/', middleware, (req, res) => {
        const results = validator.post(req);
        if (!results.valid) {
            res.status(400).json({ message: results.message });
        } else {
            const message = new Message({
                message_body: req.body.message_body,
                message_subject: req.body.message_subject,
                message_sender: req.decoded.user.id,
                message_state: 'draft',
                message_read: 'false'
            });
            const dao = new DraftDAO(config);
            const p1 = dao.createDraft(message, req.body.message_recipient);
            const p2 = cache.updateCache(req.decoded.user.id, cache.cacheKeys.DRAFTS);
            const p3 = cache.updateCache(req.decoded.user.id, cache.cacheKeys.COUNT);
            Promise.all([p1, p2, p3])
                .then(() => {
                    res.status(204).json();
                })
                .catch((error) => {
                    res.status(error.code).json(error.msg);
                });
        }
    });

    router.put('/', middleware, (req, res) => {
        const results = validator.put(req);
        if (!results.valid) {
            res.status(400).json({ message: results.message });
        } else {
            const message = new Message({
                message_body: req.body.message_body,
                message_subject: req.body.message_subject,
                message_id: req.body.message_id,
                message_recipient: req.body.message_recipient,
                message_sender: req.decoded.user.id
            });
            const dao = new DraftDAO(config);
            const p1 = dao.updateDraft(message);
            const p2 = cache.updateCache(req.decoded.user.id, cache.cacheKeys.DRAFTS);
            const p3 = cache.updateCache(req.decoded.user.id, cache.cacheKeys.COUNT);
            Promise.all([p1, p2, p3])
                .then(() => {
                    res.status(204).json();
                })
                .catch((error) => {
                    res.status(error.code).json(error.msg);
                });
        }
    });

    router.delete('/:id', middleware, (req, res) => {
        const results = validator.delete(req);
        if (!results.valid) {
            res.status(400).json({ message: results.message });
        } else {
            const dao = new DraftDAO(config);
            const p1 = dao.deleteDraft(req.params.id, req.decoded.user.id);
            const p2 = cache.updateCache(req.decoded.user.id, cache.cacheKeys.DRAFTS);
            const p3 = cache.updateCache(req.decoded.user.id, cache.cacheKeys.COUNT);
            Promise.all([p1, p2, p3])
                .then(() => {
                    res.status(204).json();
                })
                .catch((error) => {
                    res.status(error.code).json(error.msg);
                });
        }
    });

    return router;
};
