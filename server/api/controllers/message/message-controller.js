const middleware = require('../../middleware/authentication');
const validator = require('./message-validation');
const cache = require('../../../config/cache');
const Message = require('./message-entity').Message;
const MessageDAO = require('./message-dao').MessageDAO;
const UserDAO = require('../user/user-dao').UserDAO;
const Sent = require('../sent/sent-entity').Sent;

module.exports = (router, config, io) => {
    io.on('connection', (socket) => {
        router.get('/', middleware, cache.cacheable(cache.cacheKeys.MESSAGES), (req, res) => {
            const dao = new MessageDAO(config);
            dao.getAllMessages(req.decoded.user.id)
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
                const dao = new MessageDAO(config);
                dao.getMessage(req.decoded.user.id, req.params.id)
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
                    message_state: 'inbox',
                    message_read: 'false',
                    message_recipient: req.body.message_recipient
                });
                const sent = new Sent({
                    sent_message_body: req.body.message_body,
                    sent_message_subject: req.body.message_subject,
                    sent_message_sender: req.decoded.user.id,
                });
                const dao = new MessageDAO(config);
                const userDAO = new UserDAO(config);
                const p1 = dao.createMessage(message, sent);
                const p2 = cache.updateCache(req.decoded.user.id, cache.cacheKeys.MESSAGES);
                const p3 = cache.updateCache(req.decoded.user.id, cache.cacheKeys.SENT);
                const p4 = cache.getSocketId(message.message_recipient);
                const p5 = userDAO.getUserId(req.body.message_recipient);
                const p6 = cache.updateCache(req.decoded.user.id, cache.cacheKeys.COUNT);
                Promise.all([p1, p2, p3, p4, p5, p6])
                    .then((results) => {
                        if (results[3] && io.sockets.connected[results[3]]) {
                            io.sockets.connected[results[3]].emit('message', true);
                        }
                        cache.updateCache(results[4], cache.cacheKeys.MESSAGES)
                            .then(() => {
                                res.status(204).json();
                            })
                            .catch((error) => {
                                res.status(error.code).json(error.msg);
                            });
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
                    message_read: req.body.message_read,
                    message_id: req.body.message_id,
                    message_recipient: req.decoded.user.id
                });
                const dao = new MessageDAO(config);
                const p1 = dao.updateMessage(message);
                const p2 = cache.updateCache(req.decoded.user.id, cache.cacheKeys.MESSAGES);
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
                const message = new Message({
                    message_id: req.params.id,
                    message_recipient: req.decoded.user.id
                });
                const dao = new MessageDAO(config);
                const p1 = dao.deleteMessage(message);
                const p2 = cache.updateCache(req.decoded.user.id, cache.cacheKeys.MESSAGES);
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
    });

    return router;
};
