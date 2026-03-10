const registerModel = require("../modules/modul.register")

const createRegister = async (req, res, next) => {
    try {
        const newUser = await registerModel.create(req.body);
        res.status(201).json({
            message: "User registered successfully",
            user: newUser
        })
    } catch(error) {
        next(error)
    }
}

module.exports = createRegister;