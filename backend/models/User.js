const mongoose = require('mongoose');

// USER SCHEMA
// id
// email
// password
// userHandle
// createdAt
// imageURL - TODO !important
// bio
// website
// location

// SCREAM SCHEMA
// user reference
// body
// createdAt
// likes: [ array of users who liked the scream ]
// comments: [ array of comments ]

// COMMENTS SCHEMA
// user: reference to the user
// body
// likes: [ array of users who liked the comment ]

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
    bio: String,
    website: String,
    location: String,
    screams: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Scream' }]
});

module.exports = mongoose.model('User', UserSchema);
