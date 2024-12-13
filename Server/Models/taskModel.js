const mongoose = require("mongoose");

// const taskSchema = new mongoose.Schema({
//     id: {
//         type: String,
//         required: true
//     }, 
//     content:{
//         type: JSON,
//         required: true
//     },
//     list:{
//         type:mongoose.Schema.Types.ObjectId,
//         required:true,
//         ref:'lists',
//     },
//   });
  
//   module.exports = mongoose.model("tasks", taskSchema);


  const taskSchema = new mongoose.Schema({
    _id: String,
    listId: String,
    content: String,
  });
  
//   const Task = mongoose.model("task", taskSchema);

  module.exports = mongoose.model("task", taskSchema);
  