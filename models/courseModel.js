// const mongoose = require("mongoose");
// const validator = require("validator");
// const bcrypt = require("bcryptjs");
// const crypto = require("crypto");

// const userSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: [true, "Please tell us your name!"],
//   },
//   email: {
//     type: String,
//     required: [true, "Please provide your email"],
//     unique: true,
//     lowercase: true,
//     validate: [validator.isEmail, "Please provide valid email!"],
//   },
//   role: {
//     type: String,
//     required: true,
//     enum: ["user", "teacher", "admin"],
//   },
//   password: {
//     type: String,
//     required: [true, "Please provide a password!"],
//     minlength: 5,
//     maxlength: 10,
//     select: false,
//   },
//   cpassword: {
//     type: String,
//     required: [true, "Please confirm your password!"],
//     validate: {
//       validator: function (el) {
//         //only works for "create" and "save" command
//         return el === this.password; //Ahmar123 === Ahmar123
//       },
//       message: "Passwords are not the same!",
//     },
//   },
//   profilePic: String,
//   gender: {
//     type: String,
//     enum: ["male", "female", "other"],
//   },
//   dob: Date,
//   phone: String,
//   userdescription: String,
//   passwordChangedAt: Date,
//   passwordResetToken: String,
//   passwordResetExpires: Date,
//   active: {
//     type: "boolean",
//     default: true,
//     select: false,
//   },
// });

// //model
// const User = mongoose.model("User", userSchema);

// module.exports = User;
