const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRETKEY;
const userModel = require("../Models/userModel");


module.exports = async (req, res, next)=>{
    try{
        // const token = req.headers;
        const token = req.headers?.authorization;
        console.log(token);
        if(!token){
            return res.status(401).json({message:"No token provided"})
        }
        const splitToken = token.split(" ")[1]
        // console.log(splitToken);

        const decode = jwt.verify(splitToken, secretKey);
        // console.log(decode);

        if(!decode){
            return res.status(401).json({message:"No token provided"})
        }
        const user = await userModel.findById(decode._id);
        console.log(user); 

        if(!user){
            return res.status(401).json({message:"User Not Found"});
        }
        next();

    }
    catch(err){
        res.status(400).send("Invalid Token");
    }

};





