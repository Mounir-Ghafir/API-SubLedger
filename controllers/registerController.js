const registerModel = require("../modules/modul.register")
const bcrypt = require("bcryptjs")

const createRegister = async (req, res, next) => {
    try {

        const { password } = req.body
        const hashedPassword = await bcrypt.hash(password , 10)

        const newUser = await registerModel.create({
            ...req.body,
            password : hashedPassword
        });

        res.status(201).json({
            message: "User registered successfully",
            user: newUser
        })

    } catch(error) {
        next(error)
    }
}

module.exports = createRegister;