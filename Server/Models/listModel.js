const mongoose = require("mongoose");

const listSchema = new mongoose.Schema({
    listId:{
        type: Number,
        required: true,
        default:1
    },
    listName:{
        type:String,
        required:true
    },
    listColor:{
        type:String, 
        required:true
    },
    boardId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "boards",
        required: true
    },
},
{
    versionKey:false,
    timestamps:true
}
);

module.exports = mongoose.model("lists", listSchema);
