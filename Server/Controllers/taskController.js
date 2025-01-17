 const { json } = require("express");
 const mongoose = require("mongoose");
 const listModel = require("../Models/listModel");
 const taskModel = require("../Models/taskModel");
  
//  // Create Task
//  exports.createTask = async (req, res) => {
//    try {
//      const listId = req.params.listId;
//      const { taskName } = req.body;
 
//      const list = await listModel.findById(listId);
//      if (!list) {
//        return res.status(404).json({ message: "List not found" });
//      }
 
//      const newTask = new taskModel({
//        taskName,
//        listId: list._id,
//      });
 
//      const savedTask = await newTask.save();
//      res.status(201).json({
//        message: "Task created successfully",
//        board: savedTask,
//      });
//    } catch (error) {
//      console.error("Error creating board:", error);
//      res.status(500).json({ message: "Server error", error });
//    }
//  };
 

// Create Task and Update List
exports.createTask  = async (req, res)=>{
  console.log(req.body);

  const {taskName, listId}

};


// // Create Task and Update List
// exports.createTask = async (req, res) => {
//   try {
//     const { taskName, listId } = req.body;

//     const newTask = new taskModel({ taskName, listId });
//     const savedTask = await newTask.save(); 

//     await listModel.findByIdAndUpdate(
//       listId,
//       { $push: { taskId: savedTask._id } },
//     );

//     res.status(201).json({
//       message: 'Task created successfully and added to the list',
//       task: savedTask,
//     });
//   } catch (error) {
//     console.error('Error creating task:', error);
//     res.status(500).json({ message: 'Server error', error });
//   }
// };
