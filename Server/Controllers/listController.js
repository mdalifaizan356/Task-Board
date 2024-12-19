const { json } = require("express");
const mongoose = require("mongoose");
const userModel = require("../Models/userModel");
const listModel = require("../Models/listModel");
 
// Create Board
exports.createList = async (req, res) => {
  try {
    const boardId = req.params.boardId;
    const { listId, listName, listColor} = req.body;

    const board = await userModel.findById(boardId);
    if (!boardId) {
      return res.status(404).json({ message: "board not found" });
    }

    const newBoard = new listModel({
        listId,
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