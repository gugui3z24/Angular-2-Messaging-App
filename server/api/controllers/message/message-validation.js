exports = module.exports = {};

exports.post = (req) => {
    let valid = false;
    let message;
    if (!req.body.message_recipient) message = 'Recipient is required. ';
    if (!req.body.message_subject) message = message + 'Subject is required. ';
    if (!req.body.message_body) message = message = 'Message body is required. ';
    if (!message) valid = true;
    return { valid: valid, message: message };
};

exports.get = (req) => {
    let valid = false;
    let message;
    if (!req.params.id) message = 'Message id is required.';
    if (!message) valid = true;
    return { valid: valid, message: message };
};

exports.put = (req) => {
    let valid = false;
    let message;
    if (!req.body.message_id) message = 'Message id is required. ';
    if (!req.body.message_read) message = message + 'Message status is required. ';
    if (!message) valid = true;
    return { valid: valid, message: message };
};

exports.delete = (req) => {
    let valid = false;
    let message;
    if (!req.params.id) message = 'Message id is required. ';
    if (!message) valid = true;
    return { valid: valid, message: message };
};
