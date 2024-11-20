const mongoose = require("mongoose")

 const dbconnection = async() => {
    // mongoose.connect(process.env.MONGO_URI, {
    //     dbName: "Attendence_Tracker"
    // }).then(() => {
    //     console.log("Database is connected successfull");
    // }).catch(error => {
    //     console.log(`fail to connect database ${error}`);
    // });


    try {
        const connectionInstance= await mongoose.connect(process.env.MONGO_URI,{
            dbName:"Attendence_Tracker"
        })
        console.log("Databse is connected successfully");
        
    } catch (error) {
        console.log("Database connection error", error);
process.exit(1)        
    }
}
module.exports=dbconnection