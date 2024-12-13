const { json } = require("express");
const listModel = require("../Models/listModel");
const taskModel = require("../Models/taskModel");
const mongoose = require("mongoose");
 
// // Create List
// exports.createList = async (req, res) => {
//     console.log(req.body);
//     listData=req.body
//     try {
//           const list = new listModel(listData); 
//           console.log(listData);
//           await list.save();
//         }catch (error) {
//         console.error("Error saving lists:", error);
//       }
// };

// Save Lists
exports.createList = async (req, res) => {
  try {
    const newList = new listModel(req.body);
    await newList.save();
    res.status(201).send("List created!");
  }
  catch (err) {
    res.status(400).send(err.message); 
  }
};

// Save Tasks
exports.createTask = async (req, res) => {
  try {
    const newTask = new taskModel(req.body);
    await newTask.save();
    res.status(201).send("Task created!");
  }
  catch (err) {
    res.status(400).send(err.message);
  }
};

// Update Tasks
exports.createTask = async (req, res) => {
  try {
    const newTask = new taskModel(req.body);
    await newTask.save();
    res.status(201).send("Task created!");
  }
  catch (err) {
    res.status(400).send(err.message);
  }
};
