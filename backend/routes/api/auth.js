const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const { jwtSecret } = require('../../Config');

//contains the login and signup routes

router.post('/', async (req, res) => {
    try {
        const user = new User({
            userHandle: req.body.userHandle,
            email: req.body.email,
            password: req.body.password
        });
        console.log(req.body.userHandle);

        const salt = await bcrypt.genSalt(12);
        console.log(req.body.password, salt);

        user.password = await bcrypt.hash(user.password, salt);

        await user.save();

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(payload, jwtSecret, { expiresIn: 3600 }, function(err, token) {
            if (err) throw err;
            return res.status(201).json({ token });
        });
    } catch (err) {
        console.error('err is : ', err);
        return res.status(400).json({ error: err.message });
    }
});

module.exports = router;
