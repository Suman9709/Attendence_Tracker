const mongoose = require('mongoose');

const instituteSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        
    },
    season:{
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
    },


});

export const Institute = mongoose.model("Institute", instituteSchema);