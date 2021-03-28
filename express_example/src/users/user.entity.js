const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { USER_ROLES, LOGIN_MAX_RETRIES } = require('../commons/util');

const Schema = mongoose.Schema;

const schema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true,
    },

    firstName: {
        type: String,
        required: true,
    },

    lastName: {
        type: String,
        required: true,
    },

    role: {
        type: String,
        enum: [USER_ROLES.ADMIN, USER_ROLES.CUSTOMER],
        default: USER_ROLES.CUSTOMER,
    },

    failedAttempts: {
        type: Number,
        default: 0,
    },

}, { collection: 'users' });

schema.pre('save', function (next) {
    if (this.isModified('password')) {
        const salt = bcrypt.genSaltSync();
        this.password = bcrypt.hashSync(this.password, salt);
    }

    next();
})

schema.virtual('isLocked').get(function () {
    return this.failedAttempts >= LOGIN_MAX_RETRIES;
})

module.exports = mongoose.model('User', schema);
