const fs = require('fs');
const USER_ROLES = {
    ADMIN: 'admin',
    CUSTOMER: 'customer',
};
const LOGIN_MAX_RETRIES = 2;

module.exports = {
    USER_ROLES,
    LOGIN_MAX_RETRIES,

    writeInFile(content) {
        return new Promise((resolve) => {
            fs.writeFile('content.txt', content, { encoding: 'utf-8' }, () => {
                resolve();
            });
        })
    },

    readFromFile() {
        return new Promise((resolve, reject) => {
            fs.readFile('content.txt', (err, data) => {
                if (err) {
                    return reject(err);
                }

                resolve(data);
            });
        });
    }
}
