 const { json } = require("express");
 const mongoose = require("mongoose");
 const listModel = require("../Models/listModel");
 const taskModel = require("../Models/taskModel");
  
// Create Task and Update List
exports.createTask = async (req, res) => {
  try {
    const { taskName, listId } = req.body;

    const newTask = new taskModel({ taskName, listId });
    const savedTask = await newTask.save(); 

    await listModel.findByIdAndUpdate(
      listId,
      { $push: { taskId: savedTask._id } },
    );

    res.status(201).json({
      message: 'Task created successfully and added to the list',
      task: savedTask,
    });
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};
