const config = require('../../config/db').connection;
const secret = require('../../config/db').secret;
const moment = require('moment');
const jwt = require('jsonwebtoken');

const authenticationRequired = (req, res, next) => {
  if (!req.headers.session) {
    res.status(401).json({ message: 'You must be logged in. ' });
  } else {
    jwt.verify(req.headers.session, secret, (err, decoded) => {
      if (err) {
        res.status(401).json({ message: 'Session is invalid. Please login again.' });
      } else {
        const sql = `SELECT * FROM sessions WHERE session_id = ?`;
        config.query(sql, [decoded.session.sessionId], (err, results) => {
          if (err) {
            res.status(500).json();
          } else {
            if (results.length === 0) {
              res.status(401).json({ message: 'Session has expired. Please login again.' });
            } else {
              const userSession = JSON.parse(results[0].data);
              const currentMili = moment().unix();
              const expireMili = moment(userSession.cookie.expires).unix();
              const timeRemaining = expireMili - currentMili;
              if (timeRemaining < 0) {
                const sql = `DELETE FROM sessions WHERE session_id = ?`;
                config.query(sql, [results[0].session_id], (err) => {
                  if (err) {
                    res.status(500).json();
                  } else {
                    res.status(401).json({ message: 'Session has expired. Please login again.' });
                  }
                });
              } else {
                const newTime = moment().add('15', 'm');
                userSession.cookie.expires = newTime;
                const sql = `UPDATE sessions SET data = ? WHERE session_id = ?`;
                config.query(sql, [JSON.stringify(userSession), results[0].session_id], (err) => {
                  if (err) {
                    res.status(500).json();
                  } else {
                    req.decoded = {
                      user: JSON.parse(results[0].data)['user'],
                      session: results[0]
                    };
                    next();
                  }
                });
              }
            }
          }
        });
      }
    });
  }
};

module.exports = authenticationRequired;