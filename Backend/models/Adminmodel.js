const mongoose  = require ('mongoose')

const adminSchema = new mongoose.Schema({
    name: { 
    type:String,
    require:true,
},
username:{
    type:String,
    require:true,
},
password:{
    type:String,
    require:true,
}
});
export const Admin = mongoose.model("Admin", adminSchema);