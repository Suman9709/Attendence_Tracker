// import { type } from "os";

import mongoose from "mongoose";


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
    gender:{
        type:String,
        enum:['Male','Female'],
        require:true,
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
});

// export const Student = mongoose.model("Student", studentSchema);
export const Student = mongoose.model("Student", studentSchema)