const { json } = require("express");
const mongoose = require("mongoose");
const userModel = require("../Models/userModel");
const boardModel = require("../Models/boardModel");
 

exports.createBoard = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { boardId, boardName, lists } = req.body;

    // Find user by userId
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create a new board
    const newBoard = new boardModel({
      boardId,
      boardName,
      userId: user._id,
      lists,
    });

    // Save the board to the database
    const savedBoard = await newBoard.save();
    res.status(201).json({
      message: "Board created successfully",
      board: savedBoard,
    });
  } catch (error) {
    console.error("Error creating board:", error);
    res.status(500).json({ message: "Server error", error });
  }
};
