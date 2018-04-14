const validator = require('./authentication-validation');
const secret = require('../../../config/db').secret;
const sessionExpire = require('../../../config/db').sessionExpire;
const jwt = require('jsonwebtoken');
const middleware = require('../../middleware/authentication');
const UserDAO = require('../../controllers/user/user-dao').UserDAO;
const User = require('../../controllers/user/user-entity').User;
const Session = require('../../../config/session').Session;

module.exports = (router, config) => {
  router.post('/', (req, res) => {
    const results = validator.post(req);
    if (!results.valid) {
      res.status(400).json({ message: results.message });
    } else {
      const dao = new UserDAO(config);
      dao.getUser(req.body.username)
        .then((results) => {
          const user = new User(req.body.username, req.body.password);
          const validPassword = user.decryptPassword(req.body.password, results[0].user_password);
          if (!validPassword) {
            res.status(401).json({ message: 'Username or password is incorrect.' });
          } else {
            req.session.user = { username: results[0].user_username, id: results[0].user_id, sessionId: req.sessionID };
            const session = jwt.sign({ session: req.session.user }, secret, { expiresIn: sessionExpire });
            res.status(200).json({ user: req.session.user, session: session });
          }
        })
        .catch((error) => {
          res.status(error.code).json(error.msg);
        });
    }
  });

  router.delete('/', middleware, (req, res) => {
    const session = new Session(config);
    session.deleteSession(req.headers.session)
      .then(() => {
        res.status(200).json({ message: 'User successfully logged out.' });
      })
      .catch((error) => {
        res.status(error.code).json(error.msg);
      });
  });

  return router;
};
