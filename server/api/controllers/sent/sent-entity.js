const moment = require('moment');

class Sent {
    constructor(message) {
        this.sent_id = message.sent_id;
        this.sent_message_body = message.sent_message_body;
        this.sent_message_subject = message.sent_message_subject;
        this.sent_message_sender = message.sent_message_sender;
        this.sent_message_date_sent = moment().format('YYYY-MM-DD HH:mm:ss');
        this.sent_message_recipient = message.sent_message_recipient;
    }
}


module.exports = {
    Sent: Sent
};
