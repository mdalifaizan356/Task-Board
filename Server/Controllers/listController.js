const { json } = require("express");
const mongoose = require("mongoose");
const listModel = require("../Models/listModel");
const boardModel = require("../Models/boardModel");


 
// Create Board
exports.createList = async (req, res) => {
  try {
    const boardId = req.params.boardId;
    const { listId, listName, listColor} = req.body;
    console.log(boardId)

    const board = await boardModel.findById(boardId);
    console.log(board)

    if (!board) {
      return res.status(404).json({ message: "board not found" });
    }

    const newList = new listModel({
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



// Show Board
exports.showList =  async (req, res) => {
  try {
    const { boardId } = req.params;
    const list = await listModel.find({ boardId });

    if (list.length === 0) {
      return res.status(404).json({ message: "No list found" });
    }

    res.status(200).json({
      message: "list fetched successfully",
      boards,
    });
  } catch (error) {
    console.error("Error fetching boards:", error);
    res.status(500).json({ message: "Server error", error });
  }
};