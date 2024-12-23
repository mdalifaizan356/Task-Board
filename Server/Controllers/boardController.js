const { json } = require("express");
const mongoose = require("mongoose");
const userModel = require("../Models/userModel");
const boardModel = require("../Models/boardModel");
 
// Create Board
exports.createBoard = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { boardId, boardName, boardColor} = req.body; 
 
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newBoard = new boardModel({
      boardId,
      boardName,
      userId: user._id,
      boardColor
    });
    const savedBoard = await newBoard.save();
    res.status(200).json({
      message: "Board created successfully",
      board: savedBoard,
    });
  } catch (error) {
    console.error("Error creating board:", error);
    res.status(500).json({ message: "Server error", error });
  }
};


// Show Board
exports.showBoard =  async (req, res) => {
  try {
    const { userId } = req.params;
    const boards = await boardModel.find({ userId });

    if (boards.length === 0) {
      return res.status(404).json({ message: "No boards found" });
    }

    res.status(200).json({
      message: "Boards fetched successfully",
      boards,
    });
  } catch (error) {
    console.error("Error fetching boards:", error);
    res.status(500).json({message: "Server error", error });
  }
};

// Delete Board
//   exports.deleteBoard = async (req, res) => {
//   const { userId, boardId } = req.params;
//   try {
//     const result = await oardModel.deleteOne({ userId, boardId });
//     res.status(200).send({ message: 'Board deleted successfully!' });
//   } catch (error) {
//     res.status(500).send({ error: 'Failed to delete board.' });
//   }
// };