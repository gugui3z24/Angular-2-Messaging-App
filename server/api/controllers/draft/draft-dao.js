const TABLES = require('../../../config/db').TABLES;
const COLUMNS = require('../../../config/db').COLUMNS;
const FIND_DRAFTS = `SELECT
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
WHERE ${COLUMNS.MESSAGE.MESSAGE_SENDER} = ? AND ${COLUMNS.MESSAGE.MESSAGE_STATE} = ?`;
const FIND_USER = `SELECT ${TABLES.USER}.${COLUMNS.USER.USER_ID}
FROM ${TABLES.USER}
WHERE ${TABLES.USER}.${COLUMNS.USER.USER_USERNAME} = ?`;
const CREATE_DRAFT = `INSERT INTO ${TABLES.MESSAGE} SET ?`;
const UPDATE_DRAFT = `UPDATE ${TABLES.MESSAGE} SET
${COLUMNS.MESSAGE.MESSAGE_SUBJECT} = ?,
${COLUMNS.MESSAGE.MESSAGE_BODY} = ?,
${COLUMNS.MESSAGE.MESSAGE_RECIPIENT} = ?
WHERE ${COLUMNS.MESSAGE.MESSAGE_ID} = ? AND ${COLUMNS.MESSAGE.MESSAGE_SENDER} = ?`;
const DELETE_DRAFT = `DELETE FROM ${TABLES.MESSAGE}
WHERE ${COLUMNS.MESSAGE.MESSAGE_ID} = ? AND ${COLUMNS.MESSAGE.MESSAGE_SENDER} = ?`;
const FIND_DRAFT = `SELECT
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
const FIND_DRAFT_BY_ID = `SELECT
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
WHERE ${COLUMNS.MESSAGE.MESSAGE_SENDER} = ?
AND ${COLUMNS.MESSAGE.MESSAGE_STATE} = ?
AND ${COLUMNS.MESSAGE.MESSAGE_ID} = ?`;
const ResponseError = require('../../../config/error').ResponseError;

class DraftDAO {
    constructor(config) {
        this.config = config;
    }

    getDraft(senderId, messageId) {
        return new Promise((resolve, reject) => {
            this.config.query(FIND_DRAFT_BY_ID, [senderId, 'draft', messageId], (err, results) => {
                if (err) {
                    reject(new ResponseError());
                } else if (results.length === 0) {
                    reject(new ResponseError('Unable to find draft', 404));
                } else {
                    resolve(results);
                }
            });
        });
    }

    getAllDrafts(id) {
        return new Promise((resolve, reject) => {
            this.config.query(FIND_DRAFTS, [id, 'draft'], (err, results) => {
                if (err) {
                    reject(new ResponseError('Unable to retrieve drafts.', 500));
                } else {
                    resolve(results);
                }
            });
        });
    }

    createDraft(message, recipient) {
        return new Promise((resolve, reject) => {
            this.config.query(FIND_USER, [recipient], (err, results) => {
                if (err) {
                    reject(err);
                } else if (results.length === 0) {
                    reject(new ResponseError('Recipient was not found.', 404));
                } else {
                    message.message_recipient = results[0].user_id;
                    this.config.query(CREATE_DRAFT, [message], (err, results) => {
                        if (err) {
                            reject(new ResponseError());
                        } else if (results.affectedRows === 0) {
                            reject(new ResponseError('Unable to save draft.', 500));
                        } else {
                            resolve(results);
                        }
                    });
                }
            });
        });
    }

    updateDraft(message) {
        return new Promise((resolve, reject) => {
            this.config.query(FIND_USER, [message.message_recipient], (err, results) => {
                if (err) {
                    reject(new ResponseError());
                } else if (results.length === 0) {
                    reject(new ResponseError('Recipient was not found.', 404));
                } else {
                    this.config.query(UPDATE_DRAFT, [
                        message.message_subject,
                        message.message_body,
                        results[0].user_id,
                        message.message_id,
                        message.message_sender
                    ], (err, results) => {
                        if (err) {
                            reject(new ResponseError());
                        } else {
                            resolve(results);
                        }
                    });
                }
            });
        });
    }

    deleteDraft(messageId, userId) {
        return new Promise((resolve, reject) => {
            this.config.query(DELETE_DRAFT, [messageId, userId], (err, results) => {
                if (err) {
                    reject(new ResponseError());
                } else if (results.affectedRows === 0) {
                    reject(new ResponseError('Draft was not found.', 404));
                } else {
                    resolve(results);
                }
            });
        });
    }
}

module.exports = {
    DraftDAO: DraftDAO
};

