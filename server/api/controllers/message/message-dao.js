const ResponseError = require('../../../config/error').ResponseError;
const TABLES = require('../../../config/db').TABLES;
const COLUMNS = require('../../../config/db').COLUMNS;
const FIND_RECIPIENT = `SELECT ${TABLES.USER}.${COLUMNS.USER.USER_ID}
FROM ${TABLES.USER} WHERE ${TABLES.USER}.${COLUMNS.USER.USER_USERNAME} = ?`;
const CREATE_MESSAGE = `INSERT INTO ${TABLES.MESSAGE} SET ?`;
const CREATE_SENT = `INSERT INTO ${TABLES.SENT} SET ?`;
const UPDATE_MESSAGE = `UPDATE ${TABLES.MESSAGE} SET ${COLUMNS.MESSAGE.MESSAGE_READ} = ?
WHERE ${COLUMNS.MESSAGE.MESSAGE_ID} = ? AND ${COLUMNS.MESSAGE.MESSAGE_RECIPIENT} = ?`;
const DELETE_MESSAGE = `DELETE FROM ${TABLES.MESSAGE}
WHERE ${COLUMNS.MESSAGE.MESSAGE_ID} = ? AND ${COLUMNS.MESSAGE.MESSAGE_RECIPIENT} = ?`;
const FIND_MESSAGES = `SELECT
${COLUMNS.MESSAGE.MESSAGE_ID},
${COLUMNS.MESSAGE.MESSAGE_BODY},
${COLUMNS.MESSAGE.MESSAGE_READ},
${COLUMNS.MESSAGE.MESSAGE_SUBJECT},
${COLUMNS.MESSAGE.MESSAGE_DATE_RECEIVED},
${COLUMNS.MESSAGE.MESSAGE_STATE},
U1.${COLUMNS.USER.USER_USERNAME} AS ${COLUMNS.MESSAGE.MESSAGE_RECIPIENT},
U2.${COLUMNS.USER.USER_USERNAME} AS ${COLUMNS.MESSAGE.MESSAGE_SENDER}
FROM ${TABLES.MESSAGE}
INNER JOIN ${TABLES.USER} AS U1 ON ${TABLES.MESSAGE}.${COLUMNS.MESSAGE.MESSAGE_RECIPIENT} = U1.${COLUMNS.USER.USER_ID}
INNER JOIN ${TABLES.USER} AS U2 ON ${TABLES.MESSAGE}.${COLUMNS.MESSAGE.MESSAGE_SENDER} = U2.${COLUMNS.USER.USER_ID}
WHERE ${COLUMNS.MESSAGE.MESSAGE_RECIPIENT} = ? AND ${COLUMNS.MESSAGE.MESSAGE_STATE} = ?`;
const FIND_MESSAGE = `SELECT
${COLUMNS.MESSAGE.MESSAGE_ID},
${COLUMNS.MESSAGE.MESSAGE_BODY},
${COLUMNS.MESSAGE.MESSAGE_READ},
${COLUMNS.MESSAGE.MESSAGE_SUBJECT},
${COLUMNS.MESSAGE.MESSAGE_DATE_RECEIVED},
${COLUMNS.MESSAGE.MESSAGE_STATE},
U1.${COLUMNS.USER.USER_USERNAME} AS ${COLUMNS.MESSAGE.MESSAGE_RECIPIENT},
U2.${COLUMNS.USER.USER_USERNAME} AS ${COLUMNS.MESSAGE.MESSAGE_SENDER}
FROM ${TABLES.MESSAGE}
INNER JOIN ${TABLES.USER} AS U1 ON ${TABLES.MESSAGE}.${COLUMNS.MESSAGE.MESSAGE_RECIPIENT} = U1.${COLUMNS.USER.USER_ID}
INNER JOIN ${TABLES.USER} AS U2 ON ${TABLES.MESSAGE}.${COLUMNS.MESSAGE.MESSAGE_SENDER} = U2.${COLUMNS.USER.USER_ID}
WHERE ${COLUMNS.MESSAGE.MESSAGE_RECIPIENT} = ?
AND ${COLUMNS.MESSAGE.MESSAGE_STATE} = ?
AND ${COLUMNS.MESSAGE.MESSAGE_ID} = ?`;
const COUNT_INBOX = `SELECT COUNT(${TABLES.MESSAGE}.${COLUMNS.MESSAGE.MESSAGE_ID}) AS count
FROM ${TABLES.MESSAGE}
WHERE ${TABLES.MESSAGE}.${COLUMNS.MESSAGE.MESSAGE_RECIPIENT} = ?`;
const COUNT_SENT = `SELECT COUNT(${TABLES.SENT}.${COLUMNS.SENT.SENT_ID}) AS count
FROM ${TABLES.SENT} WHERE ${TABLES.SENT}.${COLUMNS.SENT.SENT_MESSAGE_SENDER} = ?`;
const COUNT_DRAFT = `SELECT COUNT(${TABLES.MESSAGE}.${COLUMNS.MESSAGE.MESSAGE_ID}) AS count
FROM ${TABLES.MESSAGE} WHERE ${TABLES.MESSAGE}.${COLUMNS.MESSAGE.MESSAGE_SENDER} = ?
AND ${COLUMNS.MESSAGE.MESSAGE_STATE} = 'draft'`;

class MessageDAO {
    constructor(config) {
        this.config = config;
    }

    countInbox(recipientId) {
        return new Promise((resolve, reject) => {
            this.config.query(COUNT_INBOX, [recipientId], (err, results) => {
                if (err) {
                    reject(new ResponseError());
                } else {
                    resolve(results[0].count);
                }
            });
        });
    }

    countSent(senderId) {
        return new Promise((resolve, reject) => {
            this.config.query(COUNT_SENT, [senderId], (err, results) => {
                if (err) {
                    reject(new ResponseError());
                } else {
                    resolve(results[0].count);
                }
            });
        });
    }

    countDraft(senderId) {
        return new Promise((resolve, reject) => {
            this.config.query(COUNT_DRAFT, [senderId], (err, results) => {
                if (err) {
                    reject(new ResponseError());
                } else {
                    resolve(results[0].count);
                }
            });
        });
    }

    getMessage(id, messageId) {
        return new Promise((resolve, reject) => {
            this.config.query(FIND_MESSAGE, [id, 'inbox', messageId], (err, results) => {
                if (err) {
                    reject(new ResponseError());
                } else if (results.length === 0) {
                    reject(new ResponseError('Unable to find message', 404));
                } else {
                    resolve(results);
                }
            });
        });
    }

    getAllMessages(id) {
        return new Promise((resolve, reject) => {
            this.config.query(FIND_MESSAGES, [id, 'inbox'], (err, results) => {
                if (err) {
                    reject(new ResponseError());
                } else {
                    resolve(results);
                }
            });
        });
    }

    createMessage(message, sent) {
        return new Promise((resolve, reject) => {
            this.config.query(FIND_RECIPIENT, [message.message_recipient], (err, results) => {
                if (err) {
                    reject(new ResponseError());
                } else if (results.length === 0) {
                    reject(new ResponseError('Unable able to find recipient. ', 404));
                } else {
                    message.message_recipient = results[0].user_id;
                    sent.sent_message_recipient = results[0].user_id;
                    this.config.query(CREATE_MESSAGE, [message], (err, results) => {
                        if (err) {
                            reject(new ResponseError());
                        } else if (results.affectedRows === 0) {
                            reject(new ResponseError('Unable to create message.', 500));
                        } else {
                            this.config.query(CREATE_SENT, [sent], (err, results) => {
                                if (err) {
                                    reject(new ResponseError());
                                } else if (results.affectedRows === 0) {
                                    reject(new ResponseError('Unable to create a sent message', 500));
                                } else {
                                    resolve();
                                }
                            });
                        }
                    });
                }
            });
        });
    }

    updateMessage(message, id) {
        return new Promise((resolve, reject) => {
            this.config.query(UPDATE_MESSAGE, [message.message_read, message.message_id, message.message_recipient], (err, results) => {
                if (err) {
                    reject(new ResponseError());
                } else if (results.affectedRows === 0) {
                    reject(new ResponseError('Unable to update message', 500));
                } else {
                    resolve(results);
                }
            });
        });
    }

    deleteMessage(message) {
        return new Promise((resolve, reject) => {
            this.config.query(DELETE_MESSAGE, [message.message_id, message.message_recipient], (err, results) => {
                if (err) {
                    reject(new ResponseError());
                } else if (results.affectedRows === 0) {
                    reject(new ResponseError('Unable to delete message.', 500));
                } else {
                    resolve(results);
                }
            });
        });
    }
}

module.exports = {
    MessageDAO: MessageDAO
};
