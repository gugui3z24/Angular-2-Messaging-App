const validator = require('./register-validation');
const User = require('../user/user-entity').User;
const UserDAO = require('../user/user-dao').UserDAO;
const cache = require('../../../config/cache');

module.exports = (router, config) => {
    router.post('/', (req, res) => {
        const results = validator.post(req);
        if (!results.valid) {
            res.status(400).json({ message: results.message });
        } else {
            const user = new User(req.body.username, req.body.password);
            const dao = new UserDAO(config);
            const p1 = dao.createUser(user);
            const p2 = cache.destroyCacheByKey(cache.cacheKeys.USERS);
            Promise.all([p1, p2])
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

