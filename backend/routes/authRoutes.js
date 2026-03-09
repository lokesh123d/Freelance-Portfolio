const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authMiddleware } = require('../middleware/auth');

// Public routes
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/check-admin', authController.checkAdmin);

// Protected routes
router.get('/me', authMiddleware, authController.getMe);

module.exports = router;
