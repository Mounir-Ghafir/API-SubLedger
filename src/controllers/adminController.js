const User = require("../models/User");

const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find().select("-password");
        res.status(200).json({
            message: "Users fetched successfully (Admin)",
            count: users.length,
            users
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllUsers
};
