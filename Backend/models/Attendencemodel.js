const mongoose = require("mongoose");

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

export const Attendence = mongoose.model("Attendence", attendenceSchema);