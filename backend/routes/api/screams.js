const router = require('express').Router();
const Scream = require('../../models/Screams');
const User = require('../../models/User');
const Comment = require('../../models/Comment');
const isAuth = require('../../Middleware/isAuth');
// routes for www.site.com/api/screams

//TODO: delete a scream
//TODO: like a scream
//TODO: unlike a scream

// get all screams
router.get('/', isAuth, function(req, res) {
    // to get all the screams
    //check for authorisation later
    //find all the screams from the db and return the values
    //assume the db to be called Screams

    Scream.find({}, function(err, allScreams) {
        //found all the screams
        return res.status(200).json(allScreams);
    });
});

//post a new scream
router.post('/', isAuth, async (req, res) => {
    //post a new scream to the db
    const body = req.body.body;
    try {
        const newScream = new Scream({
            body: body
        });
        newScream.save();
        console.log('user : ', req.user);
        User.findById(req.user.id, async function(err, foundUser) {
            if (err) throw err;
            else {
                foundUser.screams.push(newScream);
                const saved = await foundUser.save();
            }
        });

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
        const scream = await (
            await Scream.findById(req.params.id)
                .sort({ createdAt: 'desc' })
                .populate('comments', 'body createdAt')
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
            scream: scream.id,
            user: req.user.id
        });

        await comment.save();
        scream.comments.push(comment);
        scream.save();

        req.user.comments.push(comment);

        await User.findByIdAndUpdate(req.user.id, req.user);

        return res.status(200).json({
            message: `comment with id : ${comment._id} created successfully `
        });
    } catch (err) {
        console.err(err);
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
        let flag = 0;
        req.user.screamLikes.forEach(id => {
            if (id == scream.id) {
                flag = 1;
            }
        });
        if (flag === 1) {
            return res.status(401).json({ message: 'cannot like twice' });
        } else {
            scream.likes.push(req.user);

            await scream.save();

            req.user.screamLikes.push(scream.id);

            const user = await User.findByIdAndUpdate(req.user.id, req.user);
            return res.status(200).json({ message: 'liked successfully' });
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
        scream.likes.splice(scream.likes.indexOf(req.user.id), 1); // removed from scream
        await scream.save();

        req.user.screamLikes.splice(
            req.user.screamLikes.indexOf(req.user.id),
            1
        ); // removed from user
        const user = await User.findByIdAndUpdate(req.user.id, req.user);

        return res.status(200).json({ message: 'unliked successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'server error', err });
    }
});

module.exports = router;
