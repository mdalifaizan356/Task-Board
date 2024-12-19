const express = require("express");
const router = express.Router();
const listController = require("../Controllers/listController");
const userAuth = require("../Middlewares/userAuth")

// router.post("/createBoard", userAuth, boardController.createBoard);
router.post("/createList/:boardId", listController.createList);
// router.get("/showAllBoard/:userId", boardController.showAllBoard);



module.exports = router; 