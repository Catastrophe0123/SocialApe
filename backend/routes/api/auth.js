const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const { jwtSecret } = require('../../Config');

//contains the login and signup routes
router.post('/register', async (req, res) => {
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

// TODO: login route

router.post('/login', async (req, res) => {
    //get the username and password

    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res
                .status(400)
                .json({ message: 'invalid username or password' });
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (isMatch) {
            const payload = {
                user: {
                    id: user.id
                }
            };

            jwt.sign(payload, jwtSecret, { expiresIn: 3600 }, function(
                err,
                token
            ) {
                if (err) throw err;
                return res.status(200).json({ token });
            });
        } else {
            return res
                .status(400)
                .json({ message: 'Invalid username or password' });
        }
    } catch (err) {
        console.error(err);
        return res.json(err);
    }
});

module.exports = router;
