const mongoose = require("mongoose")

 const dbconnection = () => {
    mongoose.connect(process.env.MONGO_URI, {
        dbName: "Attendence_Tracker"
    }).then(() => {
        console.log("Database is connected successfull");
    }).catch(error => {
        console.log(`fail to connect database ${error}`);
    });
}
module.exports=dbconnection