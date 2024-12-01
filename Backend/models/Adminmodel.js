import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  username: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  refreshToken:{
    type:String,
  }
});

adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  return next();
});

adminSchema.methods.isPasswordcorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

adminSchema.methods.generateAccessToken = function () {
  const expiresIn =  process.env.JWT_ACCESS_TOKEN_EXPIRES || '5h'
  return jwt.sign(
    {
      _id: this._id,
      name: this.name,
      email: this.email,
      username: this.username,
    },
    process.env.JWT_ACCESS_TOKEN_SECRET,
    
      // expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES,
      {expiresIn}
    
  );
};

adminSchema.methods.generateRefreshToken = function () {
  const expiresIn = process.env.REFRESH_TOKEN_EXPIRES || '7d'
  return jwt.sign(
    {
      id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn,
    }
  );
};

// Export the Admin model
export const Admin = mongoose.model("Admin", adminSchema);
