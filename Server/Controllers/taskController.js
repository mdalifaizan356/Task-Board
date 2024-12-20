 const { json } = require("express");
 const mongoose = require("mongoose");
 const listModel = require("../Models/listModel");
 const taskModel = require("../Models/taskModel");
  
 // Create Board
 exports.createTask = async (req, res) => {
   try {
     const listId = req.params.listId;
     const { taskId,  taskName } = req.body;
 
     const list = await listModel.findById(listId);
     if (!list) {
       return res.status(404).json({ message: "List not found" });
     }
 
     const newTask = new taskModel({
       taskId,
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
 
 
 // Show Board
 exports.showAllBoard =  async (req, res) => {
   try {
     const { userId } = req.params;
     const boards = await boardModel.find({ userId });
 
     if (boards.length === 0) {
       return res.status(404).json({ message: "No boards found for this user" });
     }
 
     res.status(200).json({
       message: "Boards fetched successfully",
       boards,
     });
   } catch (error) {
     console.error("Error fetching boards:", error);
     res.status(500).json({ message: "Server error", error });
   }
 };