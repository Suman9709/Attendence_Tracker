import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'


const instituteSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,

    },
    season: {
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
    refreshToken: {
        type: String,
    },


});

instituteSchema.pre("save", async function (next) {
    if (this.isModified("password"))
        return next();

    this.password = await bcrypt.hash(this.password, 10);
    return next();
});

instituteSchema.methods.isPasswordcorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};

instituteSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            id: this._id,
            name: this.name,
            username: this.username,
            

        },
        process.env.JWT_ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES,
        }
    );
};

instituteSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRES,
        }
    );
};





export const Institute = mongoose.model("Institute", instituteSchema);