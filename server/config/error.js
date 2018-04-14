class ResponseError extends Error {
    constructor(message, code) {
        super(message);
        this.code = code ? code : 500;
        this.msg = this.getMessage(message);
        this.message = message ? message : 'Unknown Error';
        this.name = this.constructor.name;
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, this.constructor);
        } else {
            this.stack = (new Error(message)).stack;
        }
    }

    getMessage(message) {
        if (message) {
            return {
                message: message
            };
        } else {
            return;
        }
    }
}

module.exports = {
    ResponseError: ResponseError
};
