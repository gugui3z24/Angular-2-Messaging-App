const jwt = require('jsonwebtoken');
const secret = require('../config/db').secret;
const TABLE_NAME = 'sessions';
const COLUMN_ID = 'session_id';
const DELETE_SESSION = `DELETE FROM ${TABLE_NAME} WHERE ${COLUMN_ID} = ?`;
const ResponseError = require('./error').ResponseError;

class Session {
    constructor(config) {
        this.config = config;
    }

    deleteSession(token) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, secret, (err, decoded) => {
                if (err) {
                    reject(new ResponseError());
                } else {
                    this.config.query(DELETE_SESSION, [decoded.session.sessionId], (err, results) => {
                        if (err) {
                            reject(err);
                        } else if (results.affectedRows === 0) {
                            reject(new ResponseError('Unable to find session.', 400));
                        } else {
                            resolve();
                        }
                    });
                }
            });
        });
    }
}

module.exports = {
    Session: Session
};
