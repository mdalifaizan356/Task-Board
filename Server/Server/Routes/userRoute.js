const express = require("express");
const router = express.Router();
const userController = require("../Controllers/userController");

router.post("/createUser", userController.createUser);
router.post("/loginUser", userController.loginUser);
// router.get("/getAllUser", userController.getAllUser);
// router.get("/findOneUser/:id", userAuth, userController.findOneUser);
//  router.put("/updateUserById", userController.updateUserById);



module.exports = router;