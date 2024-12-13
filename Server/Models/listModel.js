const mongoose = require('mongoose');

// // Define a schema for the Task
// const taskSchema = new mongoose.Schema({
//   id: { 
//     type: String, 
//     required: true 
//   },
//   content: { 
//     type: String, 
//     required: true 
//   }
// });

// // Define a schema for the List
// const listSchema = new mongoose.Schema({
//   id: {
//     type: String,
//     required: true
//   },
//   title: {
//     type: String,
//     required: true
//   },
//   tasks: [taskSchema],  // Define tasks as an array of task objects
//   taskInput: { 
//     type: String, 
//     required: false 
//   }
// });

// // Create a model for the List
// const list = mongoose.model('list', listSchema);

// module.exports = list;




const listSchema = new mongoose.Schema({
  _id: String,
  title: String,
});

// const List = mongoose.model("list", listSchema);
  module.exports = mongoose.model("list", listSchema);

