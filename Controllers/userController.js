const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

//filterObj function
const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

//update me
exports.updateMe = catchAsync(async (req, res, next) => {
  //1) create error if user posts password data
  if (req.body.password || req.body.cpassword) {
    return next(
      new AppError(
        "This route is not for password Updates. Please use /updateMyPassword.",
        401
      )
    );
  }

  //2) update user document.
  const filteredBody = filterObj(
    req.body,
    "name",
    "profilePic",
    "gender",
    "dob",
    "phone",
    "country",
    "userdescription"
  );
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true, //to get updated object instead of old one.
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});

//Get All Users
exports.getAllUsers = async (req, res, next) => {
  //creating user
  const newUser = await User.find();

  //response
  res.status(200).json({
    //JSEND FORMAT
    status: "success",
    //sending token back to client
    data: {
      user: newUser,
    },
  });
};
