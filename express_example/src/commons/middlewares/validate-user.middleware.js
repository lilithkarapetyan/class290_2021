const { BadRequest: BadRequestError } = require('http-errors');
const asyncHandler = require('express-async-handler');
const validateUserMiddleware = asyncHandler(async (req, res, next) => {
    const { username, password, firstName, lastName } = req.body;

    if (!(username && password && firstName && lastName)) {
        throw new BadRequestError('All the fields are required');
    }

    if (username && !(username.length >= 4)) {
        throw new BadRequestError('Please Enter a valid username');
    }

    req.body.firstName = firstName.trim();
    req.body.lastName = lastName.trim();
    return next();
});

module.exports = validateUserMiddleware;
