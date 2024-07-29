const mongoose = require('mongoose');

const blacklistTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 3600 // Token expires after 1 hour
    }
});

module.exports = mongoose.model('BlacklistedToken', blacklistTokenSchema);
