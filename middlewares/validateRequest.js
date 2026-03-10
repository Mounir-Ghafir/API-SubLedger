const joi = require("joi");
const registerModel = require("../modules/modul.register");

const joiValidationSchema = joi.object({
    name : joi.string().required().trim(),
    email : joi.string().email().required(),
    password: joi.string().min(6).required(),
    role: joi.string().valid('user', 'admin').default('user'),
})

const validateRequest = async (req, res, next) => {
    try {
        const { error, value } = joiValidationSchema.validate(req.body);
        
        if (error) {
            return res.status(400).json({
                message: "Validation failed",
                details: error.details
            });
        }

        const existingUser = await registerModel.findOne({ email: value.email });
        
        if (existingUser) {
            return res.status(409).json({
                message: "Email already exists",
                details: "This email is already registered in the system"
            });
        }
        
        req.body = value;
        next();
    } catch(error) {
        return res.status(400).json({
            message: "Validation failed",
            details: error.details || error.message
        });
    }
}

module.exports = validateRequest;