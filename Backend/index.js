const express = require('express');
const dotenv = require('dotenv');
const Dbconnection = require('./Database/Dbconnection');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();

dotenv.config();

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true,
}))
app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extended:true, limit:"16kb"}));
app.use(express.static("public"))
app.use(cookieParser())









Dbconnection()
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`server is listening on ${process.env.PORT}`);

        })
    })
    .catch((err) => {
        console.log("Mongo db connection error", err);

    })
