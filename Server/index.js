const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const userRoute = require("./Routes/userRoute");
const boardRoute = require("./Routes/boardRoute");
const fileUpload = require('express-fileupload');
const cors = require("cors");

const app = express();

const port = process.env.PORT;
const mongo_url = process.env.MONGO_URL;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use(fileUpload());
app.use("/newuser", userRoute);
app.use("/newboard", boardRoute);



mongoose.connect(mongo_url)
.then(()=>{
    console.log("Connection Successfull with MongoDB");
})
.catch((e)=>{
    console.log("Error with mongoDB connection",e);
})

app.listen(port, ()=>{
    console.log(`Server is runnig on Port Number ${port}`);
})
