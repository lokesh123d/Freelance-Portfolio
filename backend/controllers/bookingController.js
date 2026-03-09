const BookingModel = require('../models/Booking');

class BookingController {
    // Create a new booking
    async createBooking(req, res) {
        try {
            const { name, email, mobile, date, time, type, platform, message } = req.body;

            // Validation
            if (!name || !email || !mobile || !date || !time) {
                return res.status(400).json({
                    success: false,
                    message: 'Please provide all required fields: name, email, mobile, date, and time'
                });
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return res.status(400).json({
                    success: false,
                    message: 'Please provide a valid email address'
                });
            }

            // Mobile validation (10 digits)
            const mobileRegex = /^[0-9]{10}$/;
            if (!mobileRegex.test(mobile)) {
                return res.status(400).json({
                    success: false,
                    message: 'Please provide a valid 10-digit mobile number'
                });
            }

            const bookingData = {
                name: name.trim(),
                email: email.trim().toLowerCase(),
                mobile: mobile.trim(),
                date,
                time,
                type: type || 'Consultation',
                platform: platform || 'Google Meet',
                message: message || ''
            };

            const booking = await BookingModel.create(bookingData);

            res.status(201).json({
                success: true,
                message: 'Booking created successfully',
                data: booking
            });
        } catch (error) {
            console.error('Create booking error:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to create booking',
                error: error.message
            });
        }
    }

    // Get all bookings (Admin only)
    async getAllBookings(req, res) {
        try {
            const bookings = await BookingModel.getAll();

            res.status(200).json({
                success: true,
                count: bookings.length,
                data: bookings
            });
        } catch (error) {
            console.error('Get bookings error:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to fetch bookings',
                error: error.message
            });
        }
    }

    // Get single booking
    async getBooking(req, res) {
        try {
            const { id } = req.params;
            const booking = await BookingModel.getById(id);

            if (!booking) {
                return res.status(404).json({
                    success: false,
                    message: 'Booking not found'
                });
            }

            res.status(200).json({
                success: true,
                data: booking
            });
        } catch (error) {
            console.error('Get booking error:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to fetch booking',
                error: error.message
            });
        }
    }

    // Update booking status
    async updateBooking(req, res) {
        try {
            const { id } = req.params;
            const updateData = req.body;

            const booking = await BookingModel.update(id, updateData);

            if (!booking) {
                return res.status(404).json({
                    success: false,
                    message: 'Booking not found'
                });
            }

            res.status(200).json({
                success: true,
                message: 'Booking updated successfully',
                data: booking
            });
        } catch (error) {
            console.error('Update booking error:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to update booking',
                error: error.message
            });
        }
    }

    // Delete booking
    async deleteBooking(req, res) {
        try {
            const { id } = req.params;
            await BookingModel.delete(id);

            res.status(200).json({
                success: true,
                message: 'Booking deleted successfully'
            });
        } catch (error) {
            console.error('Delete booking error:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to delete booking',
                error: error.message
            });
        }
    }
}

module.exports = new BookingController();
