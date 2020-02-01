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

module.exports = router;
