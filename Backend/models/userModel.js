// import mongoose from "mongoose";
// import jwt from "jsonwebtoken";
// import bcrypt from "bcrypt";

// const userSchema = new mongoose.Schema({
//   // Common fields for all users
//   role: {
//     type: String,
//     enum: ["Student", "Admin", "Institute"], // Differentiates between user types
//     required: true,
//   },
//   name: {
//     type: String,
//     required: true,
//   },
//   username: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String, // Only relevant for Admin
//     required: function () {
//       return this.role === "Admin";
//     },
//   },

//   // Fields specific to Student
//   fathername: {
//     type: String,
//     required: function () {
//       return this.role === "Student";
//     },
//   },
//   dob: {
//     type: Date,
//     required: function () {
//       return this.role === "Student";
//     },
//   },
//   gender: {
//     type: String,
//     enum: ["Male", "Female"],
//     required: function () {
//       return this.role === "Student";
//     },
//   },
//   studentcontact: {
//     type: String,
//     required: function () {
//       return this.role === "Student";
//     },
//   },
//   parentcontact: {
//     type: String,
//     required: function () {
//       return this.role === "Student";
//     },
//   },
//   collegeid: {
//     type: String,
//     required: function () {
//       return this.role === "Student";
//     },
//   },
//   department: {
//     type: String,
//     required: function () {
//       return this.role === "Student";
//     },
//   },
//   section: {
//     type: String,
//     required: function () {
//       return this.role === "Student";
//     },
//   },
//   address: {
//     type: String,
//     required: function () {
//       return this.role === "Student";
//     },
//   },
//   avtar: {
//     type: String, // Cloudinary URL
//     required: function () {
//       return this.role === "Student";
//     },
//   },
//   coverImg: {
//     type: String, // Cloudinary URL
//   },

//   // Fields specific to Institute
//   season: {
//     type: String,
//     required: function () {
//       return this.role === "Institute";
//     },
//   },

//   refreshToken:{
//     type:String,
//   }
// });

// // Pre-save hook for password hashing
// userSchema.pre("save", async function () {
//   if (!this.isModified("password")) return;

//   this.password = await bcrypt.hash(this.password, 10);
// });

// // Method to check password correctness
// userSchema.methods.isPasswordCorrect = async function (password) {
//   return await bcrypt.compare(password, this.password);
// };

// // Method to generate an access token
// userSchema.methods.generateAccessToken = function () {
//   return jwt.sign(
//     {
//       _id: this._id,
//       name: this.name,
//       username: this.username,
//       role: this.role,
//     },
//     process.env.JWT_ACCESS_TOKEN_SECRET,
//     { expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES }
//   );
// };

// // Method to generate a refresh token
// userSchema.methods.generateRefreshToken = function () {
//   return jwt.sign(
//     {
//       id: this._id,
//     },
//     process.env.REFRESH_TOKEN_SECRET,
//     { expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES }
//   );
// };

// // Export the User model
// export const User = mongoose.model("User", userSchema);
