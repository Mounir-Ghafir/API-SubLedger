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
        }
    }
)

const Register = mongoose.model("Register" , RegisterShema);

module.exports = Register;