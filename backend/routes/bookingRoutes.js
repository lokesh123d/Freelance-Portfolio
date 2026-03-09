const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const { authMiddleware, isAdmin } = require('../middleware/auth');

// Public routes
router.post('/', bookingController.createBooking);

// Protected routes (Admin only)
router.get('/', authMiddleware, isAdmin, bookingController.getAllBookings);
router.get('/:id', authMiddleware, isAdmin, bookingController.getBooking);
router.put('/:id', authMiddleware, isAdmin, bookingController.updateBooking);
router.delete('/:id', authMiddleware, isAdmin, bookingController.deleteBooking);

module.exports = router;
