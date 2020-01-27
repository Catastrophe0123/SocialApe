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
// screams: [ array of screams ]
// comments : [ array of comments ]
// ScreamLikes [ array of screams ]
// CommentLikes [ array of comments ]

// SCREAM SCHEMA
// user reference
// body
// createdAt
// likes: [ array of users ]
// comments: [ array of comments ]

// COMMENTS SCHEMA
// user: reference to the user
// body
// likes: [ array of users ]

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
    // TODO: imageURL
    bio: String,
    website: String,
    location: String,
    // Screams submitted by the user
    screams: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Scream' }],
    // Comments posted by the user
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    // Screams the user has liked
    screamLikes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Scream' }],
    // Comments the user has likes
    commentLikes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
});

module.exports = mongoose.model('User', UserSchema);
