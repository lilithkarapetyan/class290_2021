const express = require('express');
const router = express.Router();
const adminService = require('./admin.service');
const asyncHandler = require('express-async-handler');
const validateAdminMiddleware = require('../commons/middlewares/validate-admin.middleware');

router
    .patch('/unlock-user/:id/', validateAdminMiddleware, asyncHandler(async (req, res) => {
        const { id } = req.params;
        await adminService.unlock(id);
        res.json({ message: 'User has successfully been unlocked!' });
    }))
    .patch('/lock-user/:id/', validateAdminMiddleware, asyncHandler(async (req, res) => {
        const { id } = req.params;
        await adminService.lock(id);
        res.json({ message: 'User has successfully been locked!' });
    }));

module.exports = router;
