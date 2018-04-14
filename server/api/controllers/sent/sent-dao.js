const TABLES = require('../../../config/db').TABLES;
const COLUMNS = require('../../../config/db').COLUMNS;
const FIND_ALL_SENT = `SELECT
${COLUMNS.SENT.SENT_MESSAGE_BODY},
${COLUMNS.SENT.SENT_ID},
${COLUMNS.SENT.SENT_MESSAGE_SUBJECT},
${COLUMNS.SENT.SENT_MESSAGE_DATE_SENT},
U1.${COLUMNS.USER.USER_USERNAME} AS ${COLUMNS.SENT.SENT_MESSAGE_SENDER},
U2.${COLUMNS.USER.USER_USERNAME} AS ${COLUMNS.SENT.SENT_MESSAGE_RECIPIENT}
FROM ${TABLES.SENT} as S
INNER JOIN ${TABLES.USER} AS U1 ON S.${COLUMNS.SENT.SENT_MESSAGE_SENDER} = U1.${COLUMNS.USER.USER_ID}
INNER JOIN ${TABLES.USER} AS U2 ON S.${COLUMNS.SENT.SENT_MESSAGE_RECIPIENT} = U2.${COLUMNS.USER.USER_ID}
WHERE ${COLUMNS.SENT.SENT_MESSAGE_SENDER} = ?`;
const DELETE_SENT = `DELETE FROM ${TABLES.SENT} WHERE ${COLUMNS.SENT.SENT_ID} = ? AND ${COLUMNS.SENT.SENT_MESSAGE_SENDER} = ?`;
const FIND_SENT_MESSAGE = `SELECT
${COLUMNS.SENT.SENT_MESSAGE_BODY},
${COLUMNS.SENT.SENT_ID},
${COLUMNS.SENT.SENT_MESSAGE_SUBJECT},
${COLUMNS.SENT.SENT_MESSAGE_DATE_SENT},
U1.${COLUMNS.USER.USER_USERNAME} AS ${COLUMNS.SENT.SENT_MESSAGE_SENDER},
U2.${COLUMNS.USER.USER_USERNAME} AS ${COLUMNS.SENT.SENT_MESSAGE_RECIPIENT}
FROM ${TABLES.SENT} as S
INNER JOIN ${TABLES.USER} AS U1 ON S.${COLUMNS.SENT.SENT_MESSAGE_SENDER} = U1.${COLUMNS.USER.USER_ID}
INNER JOIN ${TABLES.USER} AS U2 ON S.${COLUMNS.SENT.SENT_MESSAGE_RECIPIENT} = U2.${COLUMNS.USER.USER_ID}
WHERE ${COLUMNS.SENT.SENT_MESSAGE_SENDER} = ? AND ${COLUMNS.SENT.SENT_ID} = ?`;
const ResponseError = require('../../../config/error').ResponseError;

class SentDAO {
    constructor(config) {
        this.config = config;
    }

    getSentMessage(id, messageId) {
        return new Promise((resolve, reject) => {
            this.config.query(FIND_SENT_MESSAGE, [id, messageId], (err, results) => {
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

    getAllSent(id) {
        return new Promise((resolve, reject) => {
            this.config.query(FIND_ALL_SENT, [id], (err, results) => {
                if (err) {
                    reject(new ResponseError());
                } else {
                    resolve(results);
                }
            });
        });
    }

    deleteSent(msgId, userId) {
        return new Promise((resolve, reject) => {
            this.config.query(DELETE_SENT, [msgId, userId], (err, results) => {
                if (err) {
                    reject(new ResponseError());
                } else if (results.affectedRows === 0) {
                    reject(new ResponseError('Unable to delete sent message.', 500));
                } else {
                    resolve(results);
                }
            });
        });
    }
}

module.exports = {
    SentDAO: SentDAO
};
