const mongoose = require("mongoose");

const boardSchema = new mongoose.Schema({
    boardId:{
        type: Number,
        required: true,
        unique: true
    },
    boardName:{
        type:String,
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true },
    lists: [
        {
            listId: { type: Number, required: true },
            listName: { type: String, required: true },
            tasks: [
                {
                    taskId:{
                        type: Number,
                        required: true
                    },
                    taskName:{
                         type: String,
                         required: true 
                    }
                }
          ]
        }
    ]
});

module.exports = mongoose.model("board", boardSchema);
