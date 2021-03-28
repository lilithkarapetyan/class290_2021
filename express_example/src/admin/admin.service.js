const User = require('../users/user.entity')
const { LOGIN_MAX_RETRIES } = require('../commons/util');
const { NotFound } = require('http-errors');

class AdminService {
    async unlock(id) {
        const user = await User.findById(id);
        if (!user) {
            throw new NotFound('User not found');
        }
        user.failedAttempts = 0;
        return await user.save();
    }
    async lock(id) {
        const user = await User.findById(id);
        if (!user) {
            throw new NotFound('User not found');
        }
        user.failedAttempts = LOGIN_MAX_RETRIES;
        return await user.save();
    }
}

module.exports = new AdminService();
