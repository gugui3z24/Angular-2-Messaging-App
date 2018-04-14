exports = module.exports = {};

exports.post = (req) => {
    let valid = false;
    let message;
    if (!req.body.username) message = 'Username is required. ';
    if (!req.body.password) message = message + 'Password is required. ';
    if (!message) valid = true;
    return { valid: valid, message: message };
};
