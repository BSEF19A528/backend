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

//get teacher course
router.get(
  "/viewTeacherCourses",
  authController.protect,
  authController.restrictTo("teacher"),
  courseController.viewTeacherCourses
);

//get all courses
router.get("/viewAllCourses", courseController.viewAllCourses);

//get all courses
router.get("/viewOneCourse/:id", courseController.viewOneCourse);

//exporting
module.exports = router;
