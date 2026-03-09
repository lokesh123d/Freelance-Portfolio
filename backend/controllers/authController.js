const UserModel = require('../models/User');
const jwt = require('jsonwebtoken');

class AuthController {
    // Register new user
    async register(req, res) {
        try {
            const { email, password, role } = req.body;

            // Validation
            if (!email || !password) {
                return res.status(400).json({
                    success: false,
                    message: 'Please provide email and password'
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

            // Password validation
            if (password.length < 6) {
                return res.status(400).json({
                    success: false,
                    message: 'Password must be at least 6 characters long'
                });
            }

            // Check if user already exists
            const existingUser = await UserModel.findByEmail(email);
            if (existingUser) {
                return res.status(409).json({
                    success: false,
                    message: 'User with this email already exists'
                });
            }

            // Create user
            const user = await UserModel.create({
                email: email.trim().toLowerCase(),
                password,
                role: role || 'user'
            });

            // Generate JWT token
            const token = jwt.sign(
                { id: user.id, email: user.email, role: user.role },
                process.env.JWT_SECRET || 'your-secret-key',
                { expiresIn: '7d' }
            );

            res.status(201).json({
                success: true,
                message: 'User registered successfully',
                data: {
                    user,
                    token
                }
            });
        } catch (error) {
            console.error('Register error:', error);
            res.status(500).json({
                success: false,
                message: 'Registration failed',
                error: error.message
            });
        }
    }

    // Login
    async login(req, res) {
        try {
            const { email, password } = req.body;

            // Validation
            if (!email || !password) {
                return res.status(400).json({
                    success: false,
                    message: 'Please provide email and password'
                });
            }

            // Find user
            const user = await UserModel.findByEmail(email.trim().toLowerCase());
            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: 'Invalid email or password'
                });
            }

            // Validate password
            const isValidPassword = await UserModel.validatePassword(password, user.password);
            if (!isValidPassword) {
                return res.status(401).json({
                    success: false,
                    message: 'Invalid email or password'
                });
            }

            // Generate JWT token
            const token = jwt.sign(
                { id: user.id, email: user.email, role: user.role },
                process.env.JWT_SECRET || 'your-secret-key',
                { expiresIn: '7d' }
            );

            // Remove password from response
            const { password: _, ...userWithoutPassword } = user;

            res.status(200).json({
                success: true,
                message: 'Login successful',
                data: {
                    user: userWithoutPassword,
                    token
                }
            });
        } catch (error) {
            console.error('Login error:', error);
            res.status(500).json({
                success: false,
                message: 'Login failed',
                error: error.message
            });
        }
    }

    // Get current user
    async getMe(req, res) {
        try {
            res.status(200).json({
                success: true,
                data: req.user
            });
        } catch (error) {
            console.error('Get me error:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to get user data',
                error: error.message
            });
        }
    }

    // Check admin status
    async checkAdmin(req, res) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({
                    success: false,
                    message: 'Please provide email and password'
                });
            }

            // Find user
            const user = await UserModel.findByEmail(email.trim().toLowerCase());
            if (!user) {
                return res.status(401).json({
                    success: false,
                    isAdmin: false,
                    message: 'Invalid credentials'
                });
            }

            // Validate password
            const isValidPassword = await UserModel.validatePassword(password, user.password);
            if (!isValidPassword) {
                return res.status(401).json({
                    success: false,
                    isAdmin: false,
                    message: 'Invalid credentials'
                });
            }

            // Check if admin
            const isAdmin = user.role === 'admin';

            res.status(200).json({
                success: true,
                isAdmin,
                message: isAdmin ? 'Admin access granted' : 'User is not an admin'
            });
        } catch (error) {
            console.error('Check admin error:', error);
            res.status(500).json({
                success: false,
                isAdmin: false,
                message: 'Failed to verify admin status',
                error: error.message
            });
        }
    }
}

module.exports = new AuthController();
