const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../Config');

module.exports = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        return res
            .status(401)
            .json({ message: 'no token. Authorization denied' });
    }
    try {
        const decoded = jwt.verify(token, jwtSecret);
        req.user = decoded.user;
        next();
    } catch (err) {
        console.error(err);
        res.status(401).json({ message: 'token is not valid' });
    }
};
