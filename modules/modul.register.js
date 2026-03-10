const mongoose = require("mongoose");

const RegisterShema = mongoose.Schema(
    {
        name : {
            type : String,
            required : true,
            trim : true
        },

        email : {
            type : String,
            required : true
        },

        password : {
            type : String,
            required : true
        },

        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user'
        }
    }
)

const Register = mongoose.model("Register" , RegisterShema);

module.exports = Register;