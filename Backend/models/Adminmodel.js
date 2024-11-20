import { type } from 'os';

const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    email:{
        type:String,
        require:true,
    },
    username: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    }
});

adminSchema.pre("save", async function () {
    if (!this.isModified("password")) return nextTick();

    this.password = bcrypt.hash(this.password, 10);
    return next();
})


adminSchema.methods.isPasswordcorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
}

adminSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id:this._id,
            name:this.name,
            email:this.email,
            username:this.username,

        },
        process.env.JWT_ACCESS_TOKEN_SECRET,
        {
           expiresIn:process.env.JWT_ACCESS_TOKEN_EXPIRES
        }
    )
}

adminSchema.methods.generateRefreshToken = function (){
    return jwt.sign(
        {
            id:this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:REFRESH_TOKEN_EXPIRIES
        }

    )
}
export const Admin = mongoose.model("Admin", adminSchema);