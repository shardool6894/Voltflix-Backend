const dotenv = require('dotenv').config();
const jwt = require('jsonwebtoken');

const middleWareFn = (req, res, next) => {
    try {
        let decoded = null;

        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith('Bearer ')) {
            const token = authHeader.slice(7);
            decoded = jwt.verify(token, process.env.JWT_Secret);
        } else {
            const { refreshToken } = req.signedCookies || {};
            if (refreshToken) {
                decoded = jwt.verify(refreshToken, process.env.JWT_Refresh_Secret);
            }
        }

        if (!decoded) {
            const err = new Error('Authentication required');
            err.statusCode = 401;
            throw err;
        }

        req.user = {
            id: decoded.id || decoded._id,
            email: decoded.email,
            role: decoded.role,
        };
        next();
    } catch (err) {
        err.statusCode = err.statusCode || 401;
        if (err.name === 'TokenExpiredError') {
            err.message = 'Session expired';
        } else if (!err.statusCode) {
            err.message = 'Invalid token';
        }
        next(err);
    }
};

// Like middleWareFn, but a missing/expired/invalid token just means "anonymous" instead of an error.
// Used on routes that work for everyone but attach the user when there is one (e.g. submitting a report).
const optionalAuth = (req, res, next) => {
    const attempts = [];
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
        attempts.push(() => jwt.verify(authHeader.slice(7), process.env.JWT_Secret));
    }
    const { refreshToken } = req.signedCookies || {};
    if (refreshToken) {
        attempts.push(() => jwt.verify(refreshToken, process.env.JWT_Refresh_Secret));
    }
    for (const attempt of attempts) {
        try {
            const decoded = attempt();
            req.user = { id: decoded.id || decoded._id, email: decoded.email, role: decoded.role };
            break;
        } catch (err) {
            // try the next credential, otherwise stay anonymous
        }
    }
    next();
};

const requireAdmin = (req, res, next) => {
    if (!req.user || req.user.role !== 'admin') {
        const err = new Error('Admin access required');
        err.statusCode = 403;
        return next(err);
    }
    next();
};

module.exports = { middleWareFn, optionalAuth, requireAdmin };
