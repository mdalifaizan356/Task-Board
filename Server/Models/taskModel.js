const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    taskId:{
        type: Number,
        required: true,
    },
    taskName:{
        type:String,
        required:true
    },
    listId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "lists",
        required: true
    },
},
{
    versionKey:false,
    timestamps:true
}
);

module.exports = mongoose.model("tasks", taskSchema);
