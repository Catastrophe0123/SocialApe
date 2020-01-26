const router = require('express').Router();
const Scream = require('../../models/Screams');
const User = require('../../models/User');
const isAuth = require('../../Middleware/isAuth');

//routes for /api/user/

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

module.exports = router;
