// for the login security purpose
// backend/middleware/authMiddleware.js
const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
    // 1. Get token from request headers
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
        return res.status(401).json({ message: "No token provided" });
    }

    // token format: "Bearer <token>"
    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Token missing" });
    }

    try {
        // 2. Verify token using secret
        const decoded = jwt.verify(token, "mySecretKey"); // later replace with process.env.JWT_SECRET
        req.user = decoded; // store user data in request
        next(); // allow request
    } catch (err) {
        return res.status(403).json({ message: "Invalid or expired token" });
    }
}

module.exports = authMiddleware;