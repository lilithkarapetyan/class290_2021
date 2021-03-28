const User = require('../users/user.entity');
const { Unauthorized, Locked } = require('http-errors')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class AuthService {
    async validate(username, password) {
        const user = await User.findOne({ username });

        if (user.isLocked) {
            throw new Locked('The user is locked!');
        }

        if (!user || !bcrypt.compareSync(password, user.password)) {
            user.failedAttempts++;
            await user.save();
            throw new Unauthorized();
        }

        if(user.failedAttempts > 0){
            user.failedAttempts = 0;
            await user.save();
        }

        return user;
    }

    async login(username, password) {
        const user = await this.validate(username, password);

        const token = jwt.sign({ userId: user._id, username: user.username }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN
        })

        return token;
    }

    validateToken(token) {
        const obj = jwt.verify(token, process.env.JWT_SECRET, {
            ignoreExpiration: false
        })

        return { userId: obj.userId, username: obj.username };
    }
}

module.exports = new AuthService();
