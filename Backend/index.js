// const express = require('express');
// import express from "express";
import dotenv from 'dotenv';
import Dbconnection from './Database/Dbconnection.js'
import cors from 'cors';
import cookieParser from 'cookie-parser';
import express from 'express';
dotenv.config();
const app = express();
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true,
}))
app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extended:true, limit:"16kb"}));
app.use(express.static("public"))
app.use(cookieParser())


// routes import 

import userRouter from './Routes/user.routes.js'

//routes declaration
app.use('/users', userRouter) //here /users become prefix we can write http://localhost:8000/users/register 









Dbconnection()
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`server is listening on ${process.env.PORT}`);

        })
    })
    .catch((err) => {
        console.log("Mongo db connection error", err);

    })
