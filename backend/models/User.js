const { getDatabase } = require('../config/firebase');
const bcrypt = require('bcryptjs');

class UserModel {
    constructor() {
        this.db = getDatabase();
        this.ref = this.db ? this.db.ref('users') : null;
    }

    async create(userData) {
        if (!this.ref) {
            throw new Error('Database not initialized');
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(userData.password, 10);

        const user = {
            email: userData.email,
            password: hashedPassword,
            role: userData.role || 'user',
            createdAt: new Date().toISOString(),
            id: Date.now().toString()
        };

        await this.ref.child(user.id).set(user);

        // Return user without password
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }

    async findByEmail(email) {
        if (!this.ref) {
            return null;
        }

        const snapshot = await this.ref.orderByChild('email').equalTo(email).once('value');
        const users = snapshot.val();

        if (!users) {
            return null;
        }

        const userId = Object.keys(users)[0];
        return { id: userId, ...users[userId] };
    }

    async validatePassword(inputPassword, hashedPassword) {
        return await bcrypt.compare(inputPassword, hashedPassword);
    }

    async getAll() {
        if (!this.ref) {
            return [];
        }

        const snapshot = await this.ref.once('value');
        const users = snapshot.val();

        if (!users) {
            return [];
        }

        return Object.keys(users).map(key => {
            const { password, ...userWithoutPassword } = users[key];
            return {
                id: key,
                ...userWithoutPassword
            };
        });
    }
}

module.exports = new UserModel();
