const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const Course = require("../models/courseModel");

exports.createCourse = catchAsync(async (req, res, next) => {
  //creating course
  const newCourse = await Course.create(req.body);

  res.status(200).json({
    //JSEND FORMAT
    status: "success",
    //sending token back to client
    data: {
      course: newCourse,
    },
  });
});

exports.viewCourse = catchAsync(async (req, res, next) => {
  //creating course
  const newCourse = await Course.findOne();

  res.status(200).json({
    //JSEND FORMAT
    status: "success",
    //sending token back to client
    data: {
      course: newCourse,
    },
  });
});
