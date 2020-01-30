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
        User.findById(req.user.id, async function(err, foundUser) {
            if (err) throw err;
            else {
                console.log(foundUser);
                foundUser.screams.push(newScream);
                const saved = await foundUser.save();
                console.log(saved);
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

module.exports = router;
