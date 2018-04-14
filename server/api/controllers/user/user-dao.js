const TABLES = require('../../../config/db').TABLES;
const COLUMNS = require('../../../config/db').COLUMNS;
const FIND_ALL_USERS = `SELECT ${COLUMNS.USER.USER_USERNAME} FROM ${TABLES.USER}`;
const FIND_USER = `SELECT * FROM ${TABLES.USER} WHERE ${COLUMNS.USER.USER_USERNAME} = ? `;
const CREATE_USER = `INSERT INTO ${TABLES.USER} SET ?`;
const ResponseError = require('../../../config/error').ResponseError;

class UserDAO {
    constructor(config) {
        this.config = config;
    }

    getUserId(recipientUsername) {
        return new Promise((resolve, reject) => {
            this.config.query(FIND_USER, [recipientUsername], (err, results) => {
                if (err) {
                    reject(new ResponseError());
                } else if (results.length === 0 || !results[0].user_id) {
                    reject(new ResponseError('Unable to find recipient'));
                } else {
                    resolve(results[0].user_id);
                }
            });
        });
    }

    getAllUsers() {
        return new Promise((resolve, reject) => {
            this.config.query(FIND_ALL_USERS, (err, results) => {
                if (err) {
                    reject(new ResponseError());
                } else {
                    resolve(results);
                }
            });
        });
    }

    createUser(user) {
        const body = {};
        body[COLUMNS.USER.USER_USERNAME] = user.username;
        body[COLUMNS.USER.USER_PASSWORD] = user.password;
        return new Promise((resolve, reject) => {
            this.config.query(CREATE_USER, body, (err, results) => {
                if (err) {
                    if (err.errno === 1062) {
                        reject(new ResponseError('Username is already taken.', 400));
                    } else {
                        reject(new ResponseError());
                    }
                } else if (results.affectedRows === 0) {
                    reject(new ResponseError());
                } else {
                    resolve(results);
                }
            });
        });
    }

    getUser(username) {
        return new Promise((resolve, reject) => {
            this.config.query(FIND_USER, [username], (err, results) => {
                if (err) {
                    reject(new ResponseError());
                } else if (results.length === 0) {
                    reject(new ResponseError('Username or password is incorrect.', 401));
                } else {
                    resolve(results);
                }
            });
        });
    }
}

module.exports = {
    UserDAO: UserDAO
};
