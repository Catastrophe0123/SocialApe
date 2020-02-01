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
// createdAt
// user: reference to the user
// scream: reference to the scream
// body
// likes: [ array of users ]

// LIKES SCHEMA
// createdAt
// user: reference to user
// reference to the scream or comment

const commentSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true },
    body: String,
    // scream: { type: mongoose.Schema.Types.ObjectId, ref: 'Scream' },
    createdAt: { type: Date, default: Date.now },
    // likes for the  comment
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('Comment', commentSchema);
