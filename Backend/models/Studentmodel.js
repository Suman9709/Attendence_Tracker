import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    fathername: {
        type: String,
        require: true,
    },
    dob: {
        type: Date,
        require: true,
    },
    gender: {
        type: String,
        enum: ['Male', 'Female'],
        require: true,
    },
    studentcontact: {
        type: String,
        require: true,
    },
    parentcontact: {
        type: String,
        require: true,
    },
    collegeid: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true
    },
    department: {
        type: String,
        require: true,
    },
    section: {
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
    address: {
        type: String,
        require: true,
    },
    avtar: {
        type: String, //cloudinary url
        require: true,
    },
    coverImg: {
        type: String //cloudinary url
    },
    refreshToken: {
        type: String,
    },
});


studentSchema.pre("save", async function (next) {
    if (this.isModified("password"))
        return next();

    this.password = await bcrypt.hash(this.password, 10);
    return next();
});

studentSchema.methods.isPasswordcorrect = async function (password) {
    await bcrypt.compare(password, this.password);
};

studentSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            name: this.name,
            email: this.email,
            username: this.username,
        },
        process.env.JWT_ACCESS_TOKEN_SECRET,
        {
            expiresIn: JWT_ACCESS_TOKEN_EXPIRES,
        }
    );
};


studentSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            id: this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRES,
        }
    )
}


export const Student = mongoose.model("Student", studentSchema)