const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    contact: {
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
    dateofjoining: {
        type: Date,
        require: true,
    },

});

export const Teacher = mongoose.model("Teacher", teacherSchema);