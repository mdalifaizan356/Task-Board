const express = require("express");
const router = express.Router();
const userController = require("../Controllers/userController");

router.post("/createUser", userController.createUser);
router.post("/otpVarification", userController.otpVarification);
router.post("/loginUser", userController.loginUser);


module.exports = router;