const express = require("express");
const router = express.Router();
const listController = require("../Controllers/listController");
const userAuth = require("../Middlewares/userAuth")

// router.post("/createList", userAuth, listController.createList);
router.post("/createList", listController.createList);
router.post("/createTask", userAuth, listController.createTask);


module.exports = router;