const { Forbidden } = require('http-errors');
const asyncHandler = require('express-async-handler');
const { USER_ROLES } = require('../util');
const validateAdminMiddleware = asyncHandler(async (req, res, next) => {
    const { role } = req.user;

    if (role !== USER_ROLES.ADMIN) {
        throw new Forbidden('Not authorized!');
    }

    return next();
});

module.exports = validateAdminMiddleware;
