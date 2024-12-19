const express = require("express");
const router = express.Router();
const userController = require("../Controllers/userController");
const userAuth = require("../Middlewares/userAuth");

router.post("/createUser", userController.createUser);
router.post("/otpVarification", userController.otpVarification);
router.post("/loginUser", userController.loginUser);
// router.post("/changePassword", userController.changePassword);



module.exports = router;