const router = require('express').Router();
const Scream = require('../../models/Screams');
const User = require('../../models/User');
const Comment = require('../../models/Comment');
const isAuth = require('../../Middleware/isAuth');
// routes for www.site.com/api/screams

//TODO: delete a scream - done - working
//TODO: create a comment - done - working
//TODO: like a comment - done - working
//TODO: unlike a comment - done - working
//TODO: delete a comment - done - working
//TODO: delete a user account - otw

//TODO: like a scream - done - working
//TODO: unlike a scream - done - working

// get all screams
router.get('/', isAuth, function(req, res) {
    // to get all the screams
    //check for authorisation later
    //find all the screams from the db and return the values
    //assume the db to be called Screams

    Scream.find({}, function(err, allScreams) {
        //found all the screams
        return res.status(200).json(allScreams);
    })
        .populate('comments')
        .exec();
});

//post a new scream
router.post('/', isAuth, async (req, res) => {
    //post a new scream to the db
    const body = req.body.body;
    try {
        const newScream = new Scream({
            user: req.user.id,
            body: body
        });
        newScream.save();
        console.log('user : ', req.user);

        return res
            .status(201)
            .json(`message: created new Scream with id = ${newScream._id}`);
    } catch (err) {
        console.log('error : ', err);
        return res.status(500).json(err.message);
    }
});

// /screams/:id - get a scream with scream id
router.get('/:id', async (req, res) => {
    try {
        // const scream = await (
        //     await Scream.findById(req.params.id)
        //         .sort({ createdAt: 'desc' })
        //         .populate('comments', 'body createdAt')
        // ).execPopulate();

        const scream = await (
            await Scream.findById(req.params.id).populate('comments')
        ).execPopulate();

        if (!scream) {
            return res.status(404).json({ message: 'Scream not found' });
        }

        return res.status(200).json({ scream });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'server error' });
    }
});

// ADD VALIDATION
router.post('/:screamId/comment', isAuth, async (req, res) => {
    try {
        if (req.body.body.trim === '') {
            return res
                .status(400)
                .json({ message: 'Comment must not be empty' });
        }

        const scream = await Scream.findById(req.params.screamId);
        if (!scream) {
            return res.status(404).json({ message: 'scream not found' });
        }

        const comment = new Comment({
            body: req.body.body,
            user: req.user.id
        });

        await comment.save();
        scream.comments.push(comment);
        await scream.save();

        return res.status(200).json({
            message: `comment with id : ${comment._id} created successfully `,
            comment
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'server error' });
    }
});

router.post('/:screamId/like', isAuth, async (req, res) => {
    // we have the user
    // we have the scream

    try {
        const scream = await Scream.findById(req.params.screamId);
        if (!scream) {
            return res.status(404).json({ message: 'scream not found' });
        }
        // we got the scream
        console.log(scream.likes);
        let likedUser = scream.likes.filter(user => user == req.user.id);
        console.log('liked user :', likedUser);
        console.log('liked user :', likedUser.length);
        if (likedUser.length === 0) {
            scream.likes.push(req.user);
            await scream.save();
            return res.status(200).json({ message: 'liked successfully' });
        } else {
            return res.status(400).json({ message: 'cannot like twice' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'server error', err });
    }
});

router.post('/:screamId/unlike', isAuth, async (req, res) => {
    try {
        //we have the scream id
        // we have the user
        const scream = await Scream.findById(req.params.screamId);
        if (!scream) {
            return res.status(404).json({ message: 'scream not found' });
        }
        console.log('before splice: ', scream.likes);
        console.log(req.user.id);
        scream.likes.splice(scream.likes.indexOf(req.user.id), 1); // removed from scream
        await scream.save();
        console.log('after splice : ', scream.likes);

        return res.status(200).json({ message: 'unliked successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'server error', err });
    }
});

router.post('/:screamId/delete', isAuth, async (req, res) => {
    // delete the scream based on the scream id
    // delete in scream schema
    // delete in user schema
    // delete in comment schema

    try {
        let scream = null;
        Scream.findByIdAndDelete(req.params.screamId, function(err, found) {
            if (err) throw err;
            else {
                scream = found;
            }
        });
        // deleted the scream
        return res.status(200).json({ message: 'deleted the scream', scream });

        // if (!scream) {
        //     return res.status(404).json({ message: 'scream not found' });
        // }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ err: err.message });
    }
});

router.post('/:screamId/:commentId/like', isAuth, async (req, res) => {
    //like a comment

    try {
        const comment = await Comment.findById(req.params.commentId);
        const likedUser = comment.likes.filter(user => user === req.user.id);
        if (likedUser.length === 0) {
            comment.likes.push(req.user);
            await comment.save();
            return res.status(200).json({ message: 'liked successfully' });
        } else {
            return res.status(400).json({ message: 'cannot like twice' });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'server error', err });
    }
});

router.post('/:screamId/:commentId/unlike', isAuth, async (req, res) => {
    try {
        //we have the scream id
        // we have the user
        const comment = await Comment.findById(req.params.commentId);
        if (!comment) {
            return res.status(404).json({ message: 'comment not found' });
        }
        comment.likes.splice(comment.likes.indexOf(req.user.id), 1); // removed from scream
        await comment.save();

        return res.status(200).json({ message: 'unliked successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'server error', err });
    }
});

router.post('/:screamId/:commentId/delete', isAuth, async (req, res) => {
    //delete the comment
    try {
        Comment.findByIdAndDelete(req.params.commentId, function(err, result) {
            if (err) throw err;
            if (result === null) {
                return res
                    .status(404)
                    .json({ message: 'could not find comment' });
            }
            // we have the resultant comment and we have deleted it
        });

        //to delete the comment entry from the screamSchema
        const scream = await Scream.findById(req.params.screamId);
        // we have the scream
        scream.comments = scream.comments.filter(
            cid => cid !== req.params.commentId
        );
        scream.save();
        res.status(204).json({ message: 'deleted successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'server error', err });
    }
});

module.exports = router;
