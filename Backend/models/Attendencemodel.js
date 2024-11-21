import mongoose from "mongoose";

const attendenceSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
         ref: "Student",
        require: true,
    },

    date: {
        type: Date,
        require: true,
    },
    status: {
        type: String,
        enum: ["Present", "Absent", "Leave"],
        require: true,
    },
});

export const Attendance = mongoose.model("Attendance", attendenceSchema);