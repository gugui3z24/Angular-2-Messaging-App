const moment = require('moment');

class Message {
    constructor(message) {
        this.message_id = message.message_id;
        this.message_body = message.message_body;
        this.message_subject = message.message_subject;
        this.message_sender = message.message_sender;
        this.message_date_received = moment().format('YYYY-MM-DD HH:mm:ss');
        this.message_state = message.message_state;
        this.message_recipient = message.message_recipient;
        this.message_read = message.message_read;
    }
}


module.exports = {
    Message: Message
};
