const middleware = require('../../middleware/authentication');
const cache = require('../../../config/cache');
const MessageDAO = require('../message/message-dao').MessageDAO;

module.exports = (router, config) => {
    router.get('/', middleware, cache.cacheable(cache.cacheKeys.COUNT), (req, res) => {
        const dao = new MessageDAO(config);
        const p1 = dao.countInbox(req.decoded.user.id);
        const p2 = dao.countSent(req.decoded.user.id);
        const p3 = dao.countDraft(req.decoded.user.id);
        Promise.all([p1, p2, p3])
            .then((results) => {
                const response = {
                    inbox: results[0],
                    sent: results[1],
                    draft: results[2]
                };
                res.status(200).json({ count: response });
            })
            .catch((error) => {
                res.status(error.code).json(error.msg);
            });
    });

    return router;
};
