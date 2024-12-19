const express = require("express");
const router = express.Router();
const boardController = require("../Controllers/boardController");
const userAuth = require("../Middlewares/userAuth")

// router.post("/createBoard", userAuth, boardController.createBoard);
router.post("/createBoard/:userId", boardController.createBoard);
router.get("/showAllBoard/:userId", boardController.showAllBoard);



module.exports = router;  