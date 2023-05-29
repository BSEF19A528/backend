const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Course = require("../models/courseModel");
const multer = require("multer");
const sharp = require("sharp");

//keeping image in memory buffer
const multerStorage = multer.memoryStorage();

//multer Filter -- goal is to check if stored item is image if yes then return true otherwise return false.
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an Image! Please upload image only.", 400), false);
  }
};

//multer
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

//upload image middleware
exports.uploadCourseImages = upload.fields([
  { name: "selectLogo", maxCount: 1 },
  { name: "selectImage", maxCount: 1 },
]);

//resize image middleware
exports.resizeCourseImages = catchAsync(async (req, res, next) => {
  console.log(req.files);
  if (!req.files.selectLogo || !req.files.selectImage) return next();

  //1) selectLogo

  req.body.selectLogo = `course-${req.user.id}-${Date.now()}-logo.jpeg`;
  await sharp(req.files.selectLogo[0].buffer)
    .resize(2000, 1333)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/img/courses/${req.body.selectLogo}`);

  //2) selectImage

  req.body.selectImage = `course-${req.user.id}-${Date.now()}-image.jpeg`;
  await sharp(req.files.selectImage[0].buffer)
    .resize(2000, 1333)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/img/courses/${req.body.selectImage}`);

  next();
});

//create Course
exports.createCourse = catchAsync(async (req, res, next) => {
  //creating course
  const newCourse = await Course.create(req.body);

  console.log(newCourse);

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
  if (!req.body.user) req.body.user = req.user.id;
  const newCourse = await Course.find({ teacher: req.body.user });

  if (!newCourse) {
    return next(new AppError("No Course Found with that ID", 404));
  } else
    res.status(200).json({
      //JSEND FORMAT
      status: "success",
      //sending token back to client
      data: {
        course: newCourse,
      },
    });
});
