const express = require("express");

//importing user controller
const userController = require("../Controllers/userController");
const authController = require("../Controllers/authController");

//routes
const router = express.Router();

//authController routes
router.post("/signup", authController.signup);
router.post("/adminSignup", authController.signup);
router.post("/login", authController.login);
router.post("/forgotpassword", authController.forgotPassword);
router.patch("/resetPassword/:token", authController.resetPassword);

//update password
router.patch(
  "/updateMyPassword",
  authController.protect,
  authController.updatePassword
);

//update current user
router.patch(
  "/updateMe",
  authController.protect,
  userController.uploadUserPhoto,
  userController.resizeUserPhoto,
  userController.updateMe
);

//get all users
router.get("/", authController.protect, userController.getAllUsers);

//exporting
module.exports = router;
