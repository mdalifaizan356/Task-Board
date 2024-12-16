const express = require("express");
const router = express.Router();
const listController = require("../Controllers/listController");
const userAuth = require("../Middlewares/userAuth")

// router.post("/createList", userAuth, listController.createList);
router.post("/createList", listController.createList);
router.post("/createTask", userAuth, listController.createTask);
// router.put("/updateList/:listId", userAuth, listController.updateList);
router.put("/updateList/:listId", listController.updateList);
router.get("/showList", listController.showList);




module.exports = router;