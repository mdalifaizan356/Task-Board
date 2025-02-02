const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const userRoute = require("./Routes/userRoute");
const boardRoute = require("./Routes/boardRoute");
const listRoute = require("./Routes/listRoute");
const taskRoute = require("./Routes/taskRoute");
const fileUpload = require('express-fileupload');
const cors = require("cors");

const app = express();

const port = process.env.PORT;
const HOST = '0.0.0.0';
const mongo_url = process.env.MONGO_URL;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(
    cors({
      origin: "http://192.168.32.63:5173",
      methods: "GET,POST,PUT,PATCH,DELETE",
      credentials: true, // Optional: If you're using cookies
    })
  );
app.use(fileUpload());
app.use("/newuser", userRoute);
app.use("/newboard", boardRoute);
app.use("/newlist", listRoute);
app.use("/newtask", taskRoute);



mongoose.connect(mongo_url)
.then(()=>{
    console.log("Connection Successfull with MongoDB");
})
.catch((e)=>{
    console.log("Error with mongoDB connection",e);
})

app.listen(port, HOST,  ()=>{
    console.log(`Server is runnig on Port Number ${port}`);
})
