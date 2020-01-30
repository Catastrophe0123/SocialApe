const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../Config');
const User = require('../models/User');

module.exports = async (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        return res
            .status(401)
            .json({ message: 'no token. Authorization denied' });
    }
    try {
        const decoded = jwt.verify(token, jwtSecret);
        const user = await User.findById(decoded.user.id);
        req.user = user;
        next();
    } catch (err) {
        console.error(err);
        res.status(401).json({ message: 'token is not valid' });
    }
};
