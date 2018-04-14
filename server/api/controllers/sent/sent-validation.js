exports = module.exports = {};

exports.delete = (req) => {
    let valid = false;
    let message;
    if (!req.params.id) message = 'Message id is required. ';
    if (!message) valid = true;
    return { valid: valid, message: message };
};

exports.postId = (req) => {
    let valid = false;
    let message;
    if (!req.params.id) message = 'Message id is required.';
    if (!message) valid = true;
    return { valid: valid, message: message };
};
