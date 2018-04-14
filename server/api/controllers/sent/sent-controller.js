const middleware = require('../../middleware/authentication');
const validator = require('./sent-validation');
const cache = require('../../../config/cache');
const SentDAO = require('./sent-dao').SentDAO;

module.exports = (router, config) => {
    router.get('/', middleware, cache.cacheable(cache.cacheKeys.SENT), (req, res) => {
        const dao = new SentDAO(config);
        dao.getAllSent(req.decoded.user.id)
            .then((results) => {
                res.status(200).json({ messages: results });
            })
            .catch((error) => {
                res.status(error.code).json(error.msg);
            });
    });

    router.get('/:id', middleware, (req, res) => {
        const results = validator.postId(req);
        if (!results.valid) {
            res.status(400).json({ message: results.message });
        } else {
            const dao = new SentDAO(config);
            dao.getSentMessage(req.decoded.user.id, req.params.id)
                .then((results) => {
                    res.status(200).json({ message: results });
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
            const dao = new SentDAO(config);
            const p1 = dao.deleteSent(req.params.id, req.decoded.user.id);
            const p2 = cache.updateCache(req.decoded.user.id, cache.cacheKeys.SENT);
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
