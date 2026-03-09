const { getDatabase } = require('../config/firebase');

class BookingModel {
    constructor() {
        this.db = getDatabase();
        this.ref = this.db ? this.db.ref('bookings') : null;
    }

    async create(bookingData) {
        if (!this.ref) {
            throw new Error('Database not initialized');
        }

        const booking = {
            ...bookingData,
            createdAt: new Date().toISOString(),
            status: 'pending',
            id: Date.now().toString()
        };

        await this.ref.child(booking.id).set(booking);
        return booking;
    }

    async getAll() {
        if (!this.ref) {
            return [];
        }

        const snapshot = await this.ref.once('value');
        const bookings = snapshot.val();

        if (!bookings) {
            return [];
        }

        return Object.keys(bookings).map(key => ({
            id: key,
            ...bookings[key]
        }));
    }

    async getById(id) {
        if (!this.ref) {
            return null;
        }

        const snapshot = await this.ref.child(id).once('value');
        return snapshot.val();
    }

    async update(id, updateData) {
        if (!this.ref) {
            throw new Error('Database not initialized');
        }

        await this.ref.child(id).update({
            ...updateData,
            updatedAt: new Date().toISOString()
        });

        return this.getById(id);
    }

    async delete(id) {
        if (!this.ref) {
            throw new Error('Database not initialized');
        }

        await this.ref.child(id).remove();
        return { success: true, id };
    }
}

module.exports = new BookingModel();
