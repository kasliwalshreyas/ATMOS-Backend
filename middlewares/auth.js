require('dotenv').config();
const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    try {
        const token = req.header('auth-token');
        if (!token) return res.status(401).json({ success: false, message: 'Access Denied! You are not authorized!' });
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err
        });
    }
}

module.exports = auth;