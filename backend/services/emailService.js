let nodemailer;
try {
    nodemailer = require('nodemailer');
} catch (error) {
    console.warn('⚠️  Nodemailer not installed. Email notifications disabled.');
    console.warn('Run: npm install nodemailer');
}

// Create email transporter - Using Gmail SMTP (you can configure for your own email service)
const createTransporter = () => {
    if (!nodemailer) {
        console.warn('⚠️  Nodemailer module not available. Email notifications disabled.');
        return null;
    }

    // For production: Use environment variables for email credentials
    // For now: Using Gmail with app-specific password

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
        console.warn('⚠️  Email credentials not configured. Email notifications disabled.');
        console.warn('Set EMAIL_USER and EMAIL_PASSWORD in .env file to enable emails');
        return null;
    }

    try {
        return nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        });
    } catch (error) {
        console.warn('⚠️  Error creating email transporter:', error.message);
        return null;
    }
};

const transporter = createTransporter();

// Send booking confirmation email to owner
const sendBookingNotification = async (bookingData) => {
    if (!transporter) {
        console.log('📧 Email service not configured. Skipping notification.');
        return { success: false, message: 'Email service not configured' };
    }

    try {
        // Email to owner (Lokesh)
        const ownerMailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.OWNER_EMAIL || 'dangwallokesh61@gmail.com',
            subject: ` New Booking Confirmation: ${bookingData.name}`,
            html: `
                <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 650px; margin: 0 auto; background: #f8f9fa; padding: 0;">
                    <!-- Header -->
                    <div style="background: linear-gradient(135deg, #00f3ff 0%, #0d131a 100%); padding: 40px 20px; text-align: center; color: white;">
                        <h1 style="margin: 0; font-size: 28px; font-weight: bold;">New Booking Received! </h1>
                        <p style="margin: 10px 0 0 0; font-size: 14px; opacity: 0.9;">A new client wants to book a session with you</p>
                    </div>

                    <!-- Body -->
                    <div style="padding: 40px 20px; background: white; margin: 20px;">
                        <h2 style="color: #00f3ff; margin-top: 0; border-bottom: 2px solid #00f3ff; padding-bottom: 10px;">Client Details</h2>

                        <div style="margin: 20px 0; background: #f8f9fa; padding: 15px; border-radius: 8px;">
                            <p style="margin: 8px 0;"><strong> Name:</strong> ${bookingData.name}</p>
                            <p style="margin: 8px 0;"><strong> Email:</strong> <a href="mailto:${bookingData.email}" style="color: #00f3ff; text-decoration: none;">${bookingData.email}</a></p>
                            <p style="margin: 8px 0;"><strong> Phone:</strong> ${bookingData.mobile}</p>
                        </div>

                        <h2 style="color: #00f3ff; margin-top: 30px; border-bottom: 2px solid #00f3ff; padding-bottom: 10px;">Booking Details</h2>

                        <div style="margin: 20px 0; background: #f8f9fa; padding: 15px; border-radius: 8px;">
                            <p style="margin: 8px 0;"><strong> Date:</strong> ${bookingData.date}</p>
                            <p style="margin: 8px 0;"><strong> Time:</strong> ${bookingData.time}</p>
                            <p style="margin: 8px 0;"><strong> Session Type:</strong> ${bookingData.type}</p>
                            <p style="margin: 8px 0;"><strong>Platform:</strong> ${bookingData.platform}</p>
                        </div>

                        ${bookingData.message ? `
                        <h2 style="color: #00f3ff; margin-top: 30px; border-bottom: 2px solid #00f3ff; padding-bottom: 10px;">Client Message</h2>
                        <div style="margin: 20px 0; background: #f8f9fa; padding: 15px; border-radius: 8px;">
                            <p style="color: #333; line-height: 1.6; margin: 0;">${bookingData.message.replace(/\n/g, '<br>')}</p>
                        </div>
                        ` : ''}

                        <div style="margin-top: 30px; padding: 20px; background: #e3f2fd; border-left: 4px solid #00f3ff; border-radius: 4px;">
                            <p style="margin: 0; color: #333;"><strong> Next Step:</strong> Contact ${bookingData.name} at ${bookingData.email} or ${bookingData.mobile} to confirm the booking.</p>
                        </div>
                    </div>

                    <!-- Footer -->
                    <div style="background: #0d131a; color: white; padding: 20px; text-align: center; font-size: 12px; border-top: 2px solid #00f3ff;">
                        <p style="margin: 0; opacity: 0.8;">This is an automated notification from your portfolio system</p>
                        <p style="margin: 5px 0 0 0; opacity: 0.6;">© 2024 Lokesh Portfolio. All rights reserved.</p>
                    </div>
                </div>
            `
        };

        await transporter.sendMail(ownerMailOptions);
        console.log('✅ Booking notification sent to owner');

        // Email to client (User)
        const clientMailOptions = {
            from: 'dangwallokesh61@gmail.com',
            to: bookingData.email,
            subject: '✅ Booking Received - We will contact you soon!',
            html: `
                <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 650px; margin: 0 auto; background: #f8f9fa; padding: 0;">
                    <!-- Header -->
                    <div style="background: linear-gradient(135deg, #00f3ff 0%, #0d131a 100%); padding: 40px 20px; text-align: center; color: white;">
                        <h1 style="margin: 0; font-size: 28px; font-weight: bold;">Booking Confirmation ✅</h1>
                        <p style="margin: 10px 0 0 0; font-size: 14px; opacity: 0.9;">Thank you for booking with Lokesh</p>
                    </div>

                    <!-- Body -->
                    <div style="padding: 40px 20px; background: white; margin: 20px;">
                        <p style="font-size: 16px; color: #333; line-height: 1.6; margin-bottom: 20px;">
                            Hello <strong>${bookingData.name}</strong>,
                        </p>

                        <p style="font-size: 16px; color: #333; line-height: 1.6; margin-bottom: 20px;">
                            Thank you for booking a session! Your booking has been received and confirmed.
                        </p>

                        <h2 style="color: #00f3ff; border-bottom: 2px solid #00f3ff; padding-bottom: 10px; margin-top: 30px;">Your Booking Details</h2>

                        <div style="margin: 20px 0; background: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #00f3ff;">
                            <p style="margin: 10px 0;"><strong> Scheduled Date:</strong> ${bookingData.date}</p>
                            <p style="margin: 10px 0;"><strong> Time:</strong> ${bookingData.time}</p>
                            <p style="margin: 10px 0;"><strong> Session Type:</strong> ${bookingData.type}</p>
                            <p style="margin: 10px 0;"><strong> Meeting Platform:</strong> ${bookingData.platform}</p>
                        </div>

                        <div style="margin: 30px 0; padding: 20px; background: #fff3e0; border-left: 4px solid #ff9800; border-radius: 4px;">
                            <p style="margin: 0; color: #333; font-size: 15px;">
                                <strong> What's Next?</strong><br>
                                <span style="opacity: 0.9;">Lokesh will review your booking and contact you shortly with session details and the meeting link. He typically responds within 24-48 hours. If you have any urgent questions, feel free to reach out directly.</span>
                            </p>
                        </div>

                        <div style="margin: 30px 0; padding: 20px; background: #e8f5e9; border-left: 4px solid #4caf50; border-radius: 4px;">
                            <p style="margin: 0; color: #333; font-size: 15px;">
                                <strong> Keep this email for reference</strong><br>
                                <span style="opacity: 0.9;">You can reply to this email or contact Lokesh directly for any changes or cancellations to your booking.</span>
                            </p>
                        </div>

                        <p style="font-size: 15px; color: #666; line-height: 1.6; margin-top: 30px;">
                            Looking forward to our session!<br>
                            <strong style="color: #00f3ff; font-size: 16px;">Lokesh</strong>
                        </p>
                    </div>

                    <!-- Footer -->
                    <div style="background: #0d131a; color: white; padding: 20px; text-align: center; font-size: 12px; border-top: 2px solid #00f3ff;">
                        <p style="margin: 0; opacity: 0.8;">If you didn't book this session, please ignore this email.</p>
                        <p style="margin: 5px 0 0 0; opacity: 0.6;">© 2024 Lokesh Portfolio. All rights reserved.</p>
                    </div>
                </div>
            `
        };

        await transporter.sendMail(clientMailOptions);
        console.log('✅ Confirmation email sent to client');

        return { success: true, message: 'Booking emails sent successfully' };
    } catch (error) {
        console.error('❌ Error sending booking email:', error.message);
        return { success: false, message: error.message };
    }
};

// Send inquiry notification email to owner
const sendInquiryNotification = async (inquiryData) => {
    if (!transporter) {
        console.log('📧 Email service not configured. Skipping notification.');
        return { success: false, message: 'Email service not configured' };
    }

    try {
        // Email to owner (Lokesh)
        const ownerMailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.OWNER_EMAIL || 'dangwallokesh61@gmail.com',
            subject: `📬 New Inquiry: ${inquiryData.name}`,
            html: `
                <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 650px; margin: 0 auto; background: #f8f9fa; padding: 0;">
                    <!-- Header -->
                    <div style="background: linear-gradient(135deg, #00f3ff 0%, #0d131a 100%); padding: 40px 20px; text-align: center; color: white;">
                        <h1 style="margin: 0; font-size: 28px; font-weight: bold;">New Inquiry Received! 📬</h1>
                        <p style="margin: 10px 0 0 0; font-size: 14px; opacity: 0.9;">A potential client wants to connect with you</p>
                    </div>

                    <!-- Body -->
                    <div style="padding: 40px 20px; background: white; margin: 20px;">
                        <h2 style="color: #00f3ff; margin-top: 0; border-bottom: 2px solid #00f3ff; padding-bottom: 10px;">From</h2>

                        <div style="margin: 20px 0; background: #f8f9fa; padding: 15px; border-radius: 8px;">
                            <p style="margin: 8px 0;"><strong>📝 Name:</strong> ${inquiryData.name}</p>
                            <p style="margin: 8px 0;"><strong>📧 Email:</strong> <a href="mailto:${inquiryData.email}" style="color: #00f3ff; text-decoration: none;">${inquiryData.email}</a></p>
                            <p style="margin: 8px 0;"><strong>📌 Subject:</strong> ${inquiryData.subject || 'General Inquiry'}</p>
                        </div>

                        <h2 style="color: #00f3ff; margin-top: 30px; border-bottom: 2px solid #00f3ff; padding-bottom: 10px;">Message</h2>

                        <div style="margin: 20px 0; background: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #00f3ff;">
                            <p style="color: #333; line-height: 1.8; margin: 0; white-space: pre-wrap;">${inquiryData.message.replace(/\n/g, '<br>')}</p>
                        </div>

                        <div style="margin-top: 30px; padding: 20px; background: #e3f2fd; border-left: 4px solid #00f3ff; border-radius: 4px;">
                            <p style="margin: 0; color: #333;"><strong>💡 Next Step:</strong> Reply to ${inquiryData.name} at ${inquiryData.email} to continue the conversation.</p>
                        </div>

                        <div style="margin-top: 20px; text-align: center;">
                            <a href="mailto:${inquiryData.email}" style="background: #00f3ff; color: #000; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">Reply to ${inquiryData.name}</a>
                        </div>
                    </div>

                    <!-- Footer -->
                    <div style="background: #0d131a; color: white; padding: 20px; text-align: center; font-size: 12px; border-top: 2px solid #00f3ff;">
                        <p style="margin: 0; opacity: 0.8;">This is an automated notification from your portfolio system</p>
                        <p style="margin: 5px 0 0 0; opacity: 0.6;">© 2024 Lokesh Portfolio. All rights reserved.</p>
                    </div>
                </div>
            `
        };

        await transporter.sendMail(ownerMailOptions);
        console.log('✅ Inquiry notification sent to owner');

        // Email to client (User) - Acknowledgment
        const clientMailOptions = {
            from: process.env.EMAIL_USER,
            to: inquiryData.email,
            subject: '✅ We received your message - We will get back to you soon!',
            html: `
                <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 650px; margin: 0 auto; background: #f8f9fa; padding: 0;">
                    <!-- Header -->
                    <div style="background: linear-gradient(135deg, #00f3ff 0%, #0d131a 100%); padding: 40px 20px; text-align: center; color: white;">
                        <h1 style="margin: 0; font-size: 28px; font-weight: bold;">Message Received ✅</h1>
                        <p style="margin: 10px 0 0 0; font-size: 14px; opacity: 0.9;">Thank you for reaching out!</p>
                    </div>

                    <!-- Body -->
                    <div style="padding: 40px 20px; background: white; margin: 20px;">
                        <p style="font-size: 16px; color: #333; line-height: 1.6; margin-bottom: 20px;">
                            Hello <strong>${inquiryData.name}</strong>,
                        </p>

                        <p style="font-size: 16px; color: #333; line-height: 1.6; margin-bottom: 20px;">
                            Thank you for reaching out! I've received your message and really appreciate you taking the time to connect.
                        </p>

                        <h2 style="color: #00f3ff; border-bottom: 2px solid #00f3ff; padding-bottom: 10px; margin-top: 30px;">Your Message Summary</h2>

                        <div style="margin: 20px 0; background: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #00f3ff;">
                            <p style="margin: 8px 0;"><strong>📌 Subject:</strong> ${inquiryData.subject || 'General Inquiry'}</p>
                            <p style="margin: 12px 0; font-size: 14px; color: #666;">I'll review your message carefully.</p>
                        </div>

                        <div style="margin: 30px 0; padding: 20px; background: #fff3e0; border-left: 4px solid #ff9800; border-radius: 4px;">
                            <p style="margin: 0; color: #333; font-size: 15px;">
                                <strong>⏳ Response Timeline</strong><br>
                                <span style="opacity: 0.9;">I'm currently busy with ongoing projects, but I'll get back to you as soon as I can. You can typically expect a response within <strong>24-48 hours</strong>. If it's urgent, feel free to reach out directly.</span>
                            </p>
                        </div>

                        <div style="margin: 30px 0; padding: 20px; background: #e8f5e9; border-left: 4px solid #4caf50; border-radius: 4px;">
                            <p style="margin: 0; color: #333; font-size: 15px;">
                                <strong>💡 In the Meantime</strong><br>
                                <span style="opacity: 0.9;">Feel free to explore my portfolio and check out some of my recent projects on the website. You can also visit my LinkedIn or GitHub to learn more about my work.</span>
                            </p>
                        </div>

                        <p style="font-size: 15px; color: #666; line-height: 1.6; margin-top: 30px;">
                            Looking forward to hearing from you!<br>
                            <strong style="color: #00f3ff; font-size: 16px;">Lokesh</strong>
                        </p>
                    </div>

                    <!-- Footer -->
                    <div style="background: #0d131a; color: white; padding: 20px; text-align: center; font-size: 12px; border-top: 2px solid #00f3ff;">
                        <p style="margin: 0; opacity: 0.8;">Keep this email for reference. You can reply to it anytime.</p>
                        <p style="margin: 5px 0 0 0; opacity: 0.6;">© 2024 Lokesh Portfolio. All rights reserved.</p>
                    </div>
                </div>
            `
        };

        await transporter.sendMail(clientMailOptions);
        console.log('✅ Inquiry acknowledgment sent to client');

        return { success: true, message: 'Inquiry emails sent successfully' };
    } catch (error) {
        console.error('❌ Error sending inquiry email:', error.message);
        return { success: false, message: error.message };
    }
};

module.exports = {
    sendBookingNotification,
    sendInquiryNotification
};
