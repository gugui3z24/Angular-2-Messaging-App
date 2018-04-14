const mysql = require('mysql');
const migrations = require('../migrations/main');
const options = {
    connectionLimit: 1,
    host: 'localhost',
    user: 'root',
    password: '',
    database: process.env.databaseName,
    port: 3306
};

const startUpConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: ''
});
migrations.runStartUpMigrations(startUpConnection);
const connection = mysql.createPool(options);
const secret = 'e5ebe44c4fce4be8af218618b44ab144';
const sessionExpire = 90000;
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const sessionStore = new MySQLStore({}, connection);
console.log(sessionStore);
const TABLES = {
    MESSAGE: 'message',
    USER: 'user',
    SENT: 'sent'
};
const COLUMNS = {
    MESSAGE: {
        MESSAGE_ID: 'message_id',
        MESSAGE_BODY: 'message_body',
        MESSAGE_SUBJECT: 'message_subject',
        MESSAGE_SENDER: 'message_sender',
        MESSAGE_DATE_RECEIVED: 'message_date_received',
        MESSAGE_STATE: 'message_state',
        MESSAGE_RECIPIENT: 'message_recipient',
        MESSAGE_READ: 'message_read',
    },
    USER: {
        USER_ID: 'user_id',
        USER_USERNAME: 'user_username',
        USER_PASSWORD: 'user_password'
    },
    SENT: {
        SENT_ID: 'sent_id',
        SENT_MESSAGE_BODY: 'sent_message_body',
        SENT_MESSAGE_SUBJECT: 'sent_message_subject',
        SENT_MESSAGE_SENDER: 'sent_message_sender',
        SENT_MESSAGE_DATE_SENT: 'sent_message_date_sent',
        SENT_MESSAGE_RECIPIENT: 'sent_message_recipient'
    }
};

module.exports = {
    connection: connection,
    sessionStore: sessionStore,
    secret: secret,
    sessionExpire: sessionExpire,
    TABLES: TABLES,
    COLUMNS: COLUMNS
};

