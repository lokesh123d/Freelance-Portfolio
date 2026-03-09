const express = require('express');
const router = express.Router();

let emailService;
try {
    emailService = require('../services/emailService');
} catch (error) {
    console.warn('⚠️  Email service not available. Notifications disabled.');
    emailService = null;
}

// POST /api/notifications/booking
router.post('/booking', async (req, res) => {
    try {
        const bookingData = req.body;

        // Validate required fields
        if (!bookingData.name || !bookingData.email || !bookingData.mobile || !bookingData.date || !bookingData.time) {
            return res.status(400).json({
                success: false,
                message: 'Missing required booking information'
            });
        }

        if (!emailService) {
            // Email service not available, but don't fail the booking
            console.log('📧 Email service not available. Booking saved but notification not sent.');
            return res.json({
                success: true,
                message: 'Booking saved successfully. (Email notifications disabled)',
                bookingData
            });
        }

        // Send email notifications
        const result = await emailService.sendBookingNotification(bookingData);

        res.json({
            success: result.success,
            message: result.message || 'Booking notification sent',
            bookingData
        });
    } catch (error) {
        console.error('Booking notification error:', error);
        // Don't fail - booking is still valid even if email fails
        res.status(200).json({
            success: true,
            message: 'Booking saved (email notification failed, but booking was saved)',
            error: error.message
        });
    }
});

// POST /api/notifications/inquiry
router.post('/inquiry', async (req, res) => {
    try {
        const inquiryData = req.body;

        // Validate required fields
        if (!inquiryData.name || !inquiryData.email || !inquiryData.message) {
            return res.status(400).json({
                success: false,
                message: 'Missing required inquiry information'
            });
        }

        if (!emailService) {
            // Email service not available, but don't fail the inquiry
            console.log('📧 Email service not available. Inquiry saved but notification not sent.');
            return res.json({
                success: true,
                message: 'Inquiry saved successfully. (Email notifications disabled)',
                inquiryData
            });
        }

        // Send email notification
        const result = await emailService.sendInquiryNotification(inquiryData);

        res.json({
            success: result.success,
            message: result.message || 'Inquiry notification sent',
            inquiryData
        });
    } catch (error) {
        console.error('Inquiry notification error:', error);
        // Don't fail - inquiry is still valid even if email fails
        res.status(200).json({
            success: true,
            message: 'Inquiry saved (email notification failed, but inquiry was saved)',
            error: error.message
        });
    }
});

module.exports = router;
