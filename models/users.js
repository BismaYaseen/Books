const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

function convertLocalDate(date) {
    return new Date(date.getTime() + 5 * 60 * 60 * 1000);
}

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: () => convertLocalDate(new Date()) },
    updatedAt: { type: Date, default: () => convertLocalDate(new Date()) }
});

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
