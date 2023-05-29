const express = require("express");

//importing user controller
const userController = require("../Controllers/userController");
const authController = require("../Controllers/authController");
const courseController = require("../Controllers/courseController");

//routes
const router = express.Router();

//authController routes
router.post(
  "/createCourse",
  authController.protect,
  authController.restrictTo("teacher"),
  courseController.uploadCourseImages,
  courseController.resizeCourseImages,
  courseController.createCourse
);

//get course
router.get(
  "/viewCourse",
  authController.protect,
  authController.restrictTo("teacher"),
  courseController.viewCourse
);

//exporting
module.exports = router;
