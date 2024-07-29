const jwt = require('jsonwebtoken');
const BlacklistedToken = require('../models/blacklistToken');

const auth = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'No token provided, authorization denied' });
    }

    const token = authHeader.split(' ')[1]; 

    try {

        const blacklisted = await BlacklistedToken.findOne({ token });
        if (blacklisted) {
            return res.status(401).json({ message: 'Token is not valid' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user; 
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

module.exports = auth;
