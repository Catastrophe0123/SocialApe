const router = require('express').Router();
const Scream = require('../../models/Screams');
const User = require('../../models/User');
const isAuth = require('../../Middleware/isAuth');
const Comment = require('../../models/Comment');

//routes for /api/user/
//most all routes are protected

//get the user data
router.get('/', isAuth, async (req, res) => {
    try {
        // const user = await User.findById(req.user.id)
        //     .populate('comments screams')
        //     .execPopulate()
        //     .select('-password');

        const user = await User.findById(req.user.id).select('-password');
        const comments = await Comment.find({ user: user._id });
        const screams = await Scream.find({ user: user._id });
        console.log(screams);
        res.status(200).json({ user, screams, comments });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'server error' });
    }
});

//post user data or details
//hopefully is the update route too
// TODO: have to add server side validation
router.post('/', isAuth, async (req, res) => {
    // req contains
    // {
    //     req.id: asdsd,
    //     website: asidqwd,
    //     bio: iqusdnqd,

    // }
    User.findByIdAndUpdate(req.user.id, req.body, function(err, result) {
        if (err) {
            return res.status(500).json({ message: 'server error' });
        } else {
            result.password = '';
            return res.status(200).json(result);
        }
    });
});

router.post('/delete', isAuth, async function(req, res) {
    //delete the user
    try {
        User.findByIdAndDelete(req.user.id, function(err, result) {
            if (err) throw err;
            if (result === null) {
                return res
                    .status(404)
                    .json({ message: 'could not find the user' });
            }
        });

        //delete all the screams made by the user
        Scream.deleteMany({ user: req.user.id }, function(err) {
            if (err) throw err;
        });

        // delete all the comments made by the user
        Comment.deleteMany({ user: req.user.id }, function(err) {
            if (err) throw err;
        });

        // delete all the likes made by the user
        // naive approach i guess
        const allScreams = await Scream.find({});
        const allComments = await Comment.find({});
        allScreams.forEach(doc => {
            doc.likes = doc.likes.filter(uid => uid !== req.user.id);
            console.log(doc.likes);
            doc.comments = doc.comments.filter(uid => uid !== req.user.id);
            console.log(doc.comments);
            doc.save();
        });

        allComments.forEach(doc => {
            doc.likes = doc.likes.filter(uid => uid !== req.user.id);
            doc.save();
        });

        return res.status(200).json({ message: 'user deleted successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'server error' });
    }
});

module.exports = router;
