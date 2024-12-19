const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    Name:{
        type:String,
        required:true,
        trim:true,
    },

    Email:{
        type:String,
        required:true,
        trim:true,
    },

    PhNo:{
        type:Number,
        required:true,
    },
 

    Role:{
        type:String,
        required:true,
        trim:true,
        default:"User"
    },

    Password:{
        type:String,
        required:true,
        trim:true,
    },

    OTP:{
        type:Number,
        required:true,
        trim:true
    },

},
{
    versionKey:false,
    timestamps:true
}
);

module.exports = mongoose.model('users', userSchema);