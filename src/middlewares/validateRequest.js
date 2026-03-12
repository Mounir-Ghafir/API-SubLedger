const joi = require("joi");
const User = require("../models/User");

const registerSchema = joi.object({
    name: joi.string().required().trim(),
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
    role: joi.string().valid('user', 'admin').default('user'),
});

const loginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
});

const subscriptionSchema = joi.object({
    name: joi.string().required().trim(),
    price: joi.number().greater(0).required(),
    billingCycle: joi.string().valid('monthly', 'yearly').required(),
});

const validateRegister = async (req, res, next) => {
    try {
        const { error, value } = registerSchema.validate(req.body);

        if (error) {
            return res.status(400).json({
                message: "Validation failed",
            });
        }

        const existingUser = await User.findOne({ email: value.email });

        if (existingUser) {
            return res.status(409).json({
                message: "Email already exists",
            });
        }

        req.body = value;
        next();
    } catch (error) {
        return res.status(500).json({
            message: "Internal validation error",
        });
    }
};

const validateLogin = (req, res, next) => {
    const { error, value } = loginSchema.validate(req.body);

    if (error) {
        return res.status(400).json({
            message: "Validation failed",
            details: error.details
        });
    }

    req.body = value;
    next();
};

const validateSubscription = (req, res, next) => {
    const { error, value } = subscriptionSchema.validate(req.body);

    if (error) {
        return res.status(400).json({
            message: "Validation failed",
            details: error.details
        });
    }

    req.body = value;
    next();
};

module.exports = {
    validateRegister,
    validateLogin,
    validateSubscription
};