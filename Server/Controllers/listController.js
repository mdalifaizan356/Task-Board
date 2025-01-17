const { json } = require("express");
const mongoose = require("mongoose");
const listModel = require("../Models/listModel");
const boardModel = require("../Models/boardModel");
const taskModel = require("../Models/taskModel");


// Create List
exports.createList = async (req, res) => {
  try {
    const boardId = req.params.boardId;
    const {listName, listColor} = req.body;
    console.log(boardId)

    const board = await boardModel.findById(boardId);
    console.log(board)

    if (!board) {
      return res.status(404).json({ message: "board not found" });
    }

    const newList = new listModel({
      listName,
      boardId: board._id,
      listColor
    });

    const savedList = await newList.save();
    res.status(201).json({
      message: "List created successfully",
      list: savedList, 
    });
  } catch (error) {
    console.error("Error creating board:", error);
    res.status(500).json({ message: "Server error", error });
  }
};


// Show List
exports.showList =  async (req, res) => {
  // console.log(req.params)
  const { boardId } = req.params;
  console.log(boardId);
  try {
    const { boardId } = req.params;
    const list = await listModel.find({ boardId });

    if (list.length === 0) {
      return res.status(404).json({ message: "No list found" });
    }

    res.status(200).json({
      message: "list fetched successfully",
      list,
    });
  } catch (error) {
    console.error("Error fetching boards:", error);
    res.status(500).json({ message: "Server error", error });
  }
};



// // Show List
// exports.showList =  async (req, res) => {
//   const { boardId } = req.params;
//     try {
//         const lists = await listModel.find({ boardId });
//         if (!lists.length) {
//             return res.status(404).json({ message: "No lists found" });
//         }

//         // Fetch tasks for each list dynamically
//         const listsWithTasks = await Promise.all(
//             lists.map(async (list) => {
//                 const tasks = await taskModel.find({ listId: list._id });
//                 return {
//                     ...list._doc,
//                     tasks,
//                 };
//             })
//         );

//         res.status(200).json({
//             message: "Lists fetched successfully",
//             lists: listsWithTasks,
//         });
//     } catch (error) {
//         console.error("Error fetching lists:", error);
//         res.status(500).json({ message: "Server error", error });
//     }
// };

