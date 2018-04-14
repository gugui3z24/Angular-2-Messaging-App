const bcrypt = require('bcrypt-nodejs');

class User {
    constructor(username, password) {
        this.username = username.toLowerCase();
        this.password = this.encryptPassword(password);
    }

    encryptPassword(password) {
        return bcrypt.hashSync(password);
    }

    decryptPassword(password, encryptedPassword) {
        return bcrypt.compareSync(password, encryptedPassword);
    }
}

module.exports = {
    User: User
};
