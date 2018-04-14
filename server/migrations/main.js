exports = module.exports = {};

const createDatabase = (config) => {
  const sql = `CREATE DATABASE IF NOT EXISTS ${process.env.databaseName}`;
  config.query(sql, (err) => {
    if (err) {
      console.log('Unable to create database');
      throw err;
    }
  });
};

const createUsersTable = (config) => {
  config.changeUser({ database: process.env.databaseName });
  const sql = `CREATE TABLE IF NOT EXISTS user (
    user_id INT AUTO_INCREMENT,
    PRIMARY KEY(user_id),
    user_username VARCHAR(255) UNIQUE NOT NULL,
    user_password VARCHAR(255) NOT NULL
  )`;
  config.query(sql, (err) => {
    if (err) {
      console.log('Unable to create User table');
      throw err;
    }
  });
};

const createMessageTable = (config) => {
  const sql = `CREATE TABLE IF NOT EXISTS message(
    message_id INT AUTO_INCREMENT,
    PRIMARY KEY(message_id),
    message_body VARCHAR(255) NOT NULL,
    message_subject VARCHAR(255) NOT NULL,
    message_sender INT,
    FOREIGN KEY(message_sender) REFERENCES user(user_id),
    message_date_received DATETIME NOT NULL,
    message_state VARCHAR(255) NOT NULL,
    message_recipient INT,
    message_read ENUM("true", "false"),
    FOREIGN KEY(message_recipient) REFERENCES user(user_id)
  )`;
  config.query(sql, (err) => {
    if (err) {
      console.log('Unable to create table: message');
      throw err;
    }
  });
};

const createSentTable = (config) => {
  const sql = `
  CREATE TABLE IF NOT EXISTS sent(
    sent_id INT AUTO_INCREMENT,
    PRIMARY KEY(sent_id),
    sent_message_body VARCHAR(255) NOT NULL,
    sent_message_subject VARCHAR(255) NOT NULL,
    sent_message_sender INT,
    FOREIGN KEY(sent_message_sender) REFERENCES user(user_id),
    sent_message_date_sent DATETIME NOT NULL,
    sent_message_recipient INT,
    FOREIGN KEY(sent_message_recipient) REFERENCES user(user_id)
    );
  `;
  config.query(sql, (err) => {
    if (err) {
      console.log('Unable to create table: sent');
      throw err;
    }
  });
};

exports.runStartUpMigrations = (config) => {
  console.log('Starting up MySQL migrations...');
  createDatabase(config);
  createUsersTable(config);
  createMessageTable(config);
  createSentTable(config);
  config.end();
  console.log('Migrations complete');
};

