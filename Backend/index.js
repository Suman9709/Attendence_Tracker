const express = require('express');
const dotenv = require('dotenv');
const Dbconnection = require('./Database/Dbconnection')

dotenv.config();
Dbconnection();
const app = express();

app.listen(process.env.PORT, ()=>{
    console.log(`server is listening on ${process.env.PORT}`);
    
})