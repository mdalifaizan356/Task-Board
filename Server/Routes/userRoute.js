const express = require("express");
const router = express.Router();
const userController = require("../Controllers/userController");
const userAuth = require("../Middlewares/userAuth");

router.put("/createUser", userController.createUser);
router.post("/otpVarification", userController.otpVarification);
router.post("/loginUser", userController.loginUser);
router.patch("/changePassword", userController.changePassword);
router.patch("/recoverPassword", userController.recoverPassword);
router.patch("/recoverOTPVarification", userController.recoverOTPVarification);




module.exports = router;