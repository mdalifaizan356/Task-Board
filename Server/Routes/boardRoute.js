const express = require("express");
const router = express.Router();
const listController = require("../Controllers/boardController");
const userAuth = require("../Middlewares/userAuth")

// router.post("/createBoard", userAuth, boardController.createBoard);
router.post("/createBoard/:userId", boardController.createBoard);



module.exports = router;