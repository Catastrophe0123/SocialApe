const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    userHandle: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    screams: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Scream' }]
});

module.exports = mongoose.model('User', UserSchema);
