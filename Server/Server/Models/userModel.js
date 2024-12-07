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
 
    Gender:{
        type:String,
        required:true,
        trim:true,
    },

    Role:{
        type:String,
        required:true,
        trim:true,
    },

    Password:{
        type:String,
        required:true,
        trim:true,
    },

    Photo:{
        type:JSON,
        required:false,
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

module.exports = mongoose.model('user', userSchema);