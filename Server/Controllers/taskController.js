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


// // Move Task
// exports.moveTask = async (req, res) => {
//     try {
//       const { taskId, sourceListId, destinationListId } = req.body;
//       console.log (taskId, sourceListId, destinationListId )

//       const updatelistId = await taskModel.findByIdAndUpdate(
//         taskId,
//         { $set: { listId: destinationListId } },
//       );
//       res.status(201).json({
//         message: 'Task moved successfully and added to the list',
//         task: updatelistId,
//       });
//     } catch (error) {
//       console.error('Error creating task:', error);
//       res.status(500).json({ message: 'Server error', error });
//     }
// };



exports.moveTask = async (req, res) => {
  try {
    const { taskId, sourceListId, destinationListId } = req.body;

    // Logging for debugging
    console.log('Task ID:', taskId, 'Source List ID:', sourceListId, 'Destination List ID:', destinationListId);

    // Task ko update karo listId ke saath
    const updatedTask = await taskModel.findByIdAndUpdate(
      taskId,
      { $set: { listId: destinationListId } }, // Nayi list ke ID ke saath update
      { new: true } // Updated task ka document return kare
    );

    // Agar task nahi mila
    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found!' });
    }

    res.status(200).json({
      message: 'Task moved successfully!',
      task: updatedTask, // Updated task ki details frontend ko bheje
    });
  } catch (error) {
    console.error('Error moving task:', error);
    res.status(500).json({ message: 'Server error while moving task', error });
  }
};

