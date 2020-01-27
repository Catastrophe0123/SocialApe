const router = require('express').Router();
const Scream = require('../../models/Screams');
const User = require('../../models/User');
const isAuth = require('../../Middleware/isAuth');

//routes for /api/user/
//most all routes are protected

//get the user data
router.get('/', isAuth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.status(200).json(user);
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
        }
        //  else {
        //     return res.status(200).json(result);
        // }
    });
    User.findById(req.user.id, function(err, result) {
        if (err) {
            return res.status(500).json({ message: 'server error' });
        } else {
            return res.status(200).json(result);
        }
    }).select('-password');
});

module.exports = router;
