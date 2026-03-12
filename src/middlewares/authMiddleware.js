const jwt = require("jsonwebtoken");
const User = require("../models/User");

const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.startsWith("Bearer")
            ? req.headers.authorization.split(" ")[1]
            : null;

        if (!token) {
            return res.status(401).json({
                message: "Authentication failed",
                details: "Token is missing"
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select("-password");

        if (!user) {
            return res.status(404).json({
                message: "Authentication failed",
                details: "User not found"
            });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Authentication failed",
            details: error.message
        });
    }
};

const restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                message: "Authorization failed",
                details: "You do not have permission to perform this action"
            });
        }
        next();
    };
};

module.exports = {
    verifyToken,
    restrictTo
};