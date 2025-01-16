 const { json } = require("express");
 const mongoose = require("mongoose");
 const listModel = require("../Models/listModel");
 const taskModel = require("../Models/taskModel");
  
 // Create Task
 exports.createTask = async (req, res) => {
   try {
     const listId = req.params.listId;
     const { taskName } = req.body;
 
     const list = await listModel.findById(listId);
     if (!list) {
       return res.status(404).json({ message: "List not found" });
     }
 
     const newTask = new taskModel({
       taskName,
       listId: list._id,
     });
 
     const savedTask = await newTask.save();
     res.status(201).json({
       message: "Task created successfully",
       board: savedTask,
     });
   } catch (error) {
     console.error("Error creating board:", error);
     res.status(500).json({ message: "Server error", error });
   }
 };
 
 
//  // Show Task
//  exports.showList =  async (req, res) => {
//    console.log(req.params)
//    const { listId } = req.params;
//    console.log(listId);
//    try {
//      const { listId } = req.params;
//     //  const task = await taskModel.find({ listId });
//     const task = await taskModel.find().populate('listId');
 
//      if (task.length === 0) {
//        return res.status(404).json({ message: "No task found" });
//      }
 
//      res.status(200).json({
//        message: "task fetched successfully",
//        task,
//      });
//    } catch (error) {
//      console.error("Error fetching boards:", error);
//      res.status(500).json({ message: "Server error", error });
//    }
//  };





// Show Task
exports.showAllTask =  async (req, res) => {
  try {
   const task = await taskModel.find().populate('listId');

    if (task.length === 0) {
      return res.status(404).json({ message: "No task found" });
    }
    console.log(task)
    res.status(200).json({
      message: "task fetched successfully",
    
      task,
    });
  } catch (error) {
    console.error("Error fetching boards:", error);
    res.status(500).json({ message: "Server error", error });
  }
};