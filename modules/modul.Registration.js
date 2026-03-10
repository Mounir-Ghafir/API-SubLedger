const mongoose = require("mongoose");

const RegistrationShema = mongoose.Schema(
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

const Registration = mongoose.model("Registration" , RegistrationShema);

module.exports = Registration;