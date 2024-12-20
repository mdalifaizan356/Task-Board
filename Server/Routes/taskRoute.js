const express = require("express");
const router = express.Router();
const taskController = require("../Controllers/taskController");
const userAuth = require("../Middlewares/userAuth")

// router.post("/createBoard", userAuth, boardController.createBoard);
router.post("/createTask/:listId", taskController.createTask);
// router.get("/showAllBoard/:userId", boardController.showAllBoard);



module.exports = router;  